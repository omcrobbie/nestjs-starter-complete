import { Component, Inject } from "@nestjs/common";
import { ghostProviderToken, userProviderToken, envProviderToken } from "../common/constants";
import GhostModel from "../entity/ghost/ghost.entity";
import * as jwt from 'jsonwebtoken';
import { AuthService } from "../services/auth.service";
import { createToken, scrubTokenData } from "../common/functions";
import UserModel from "../entity/user/user.entity";
import { Env } from "../providers/env.provider";

@Component()
export class GhostService {
    constructor(
        @Inject(ghostProviderToken)
        private readonly Ghost: typeof GhostModel,
        @Inject(userProviderToken)
        private readonly User: typeof UserModel,
        @Inject(envProviderToken)
        private readonly env: typeof Env
    ) {}
    createGhost(data) {
        const ghost = this.createGhostToken(data);
        return this.Ghost.create(ghost);
    }
    createGhostToken(data) {
        const expiresIn = 60 * 60 * 24;
        return createToken(data, this.env.secret_ghost, expiresIn);
    }
    async exchangeGhostToken({token}) {
        const ghost = await this.Ghost.findOne({where: {token}});
        if (ghost && this.validateGhostToken(token)) {
            const ghostUser = jwt.decode(token);
            const user = await this.User.create(ghostUser);
            scrubTokenData(ghostUser);
            await ghost.destroy();
            return createToken(Object.assign(ghostUser, {id: user.id}), this.env.secret_jwt, 60 * 60);
        }
    }
    validateGhostToken(token) {
        try {
            jwt.verify(token, this.env.secret_ghost);
            return true;
        } catch (err) {
            return false;
        }
    }
    createToken(data, tokenSecret, expiresIn) {
        const token = jwt.sign(data, tokenSecret, {expiresIn});
        return { expiresIn, token };
    }
}