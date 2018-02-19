import { Component, Inject } from "@nestjs/common";
import { ghostProviderToken, userProviderToken } from "../../common/constants";
import GhostModel from "./ghost.entity";
import { secret_ghost, secret_jwt } from "../../common/environment";
import * as jwt from 'jsonwebtoken';
import { AuthService } from "../auth/auth.service";
import { createToken, scrubTokenData } from "../../common/functions";
import UserModel from "../user/user.entity";

@Component()
export class GhostService {
    constructor(
        @Inject(ghostProviderToken)
        private readonly Ghost: typeof GhostModel,
        @Inject(userProviderToken)
        private readonly User: typeof UserModel
    ) {}
    createGhost(data) {
        const ghost = this.createGhostToken(data);
        return this.Ghost.create(ghost);
    }
    createGhostToken(data) {
        const expiresIn = 60 * 60 * 24;
        return createToken(data, secret_ghost, expiresIn);
    }
    async exchangeGhostToken({token}) {
        const ghost = await this.Ghost.findOne({where: {token}});
        if (ghost && this.validateGhostToken(token)) {
            const ghostUser = jwt.decode(token);
            const user = await this.User.create(ghostUser);
            scrubTokenData(ghostUser);
            await ghost.destroy();
            return createToken(Object.assign(ghostUser, {id: user.id}), secret_jwt, 60 * 60);
        }
    }
    validateGhostToken(token) {
        try {
            jwt.verify(token, secret_ghost);
            return true;
        } catch (err) {
            return false;
        }
    }
}