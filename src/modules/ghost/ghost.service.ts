import { Component, Inject } from "@nestjs/common";
import { ghostProviderToken } from "../../common/constants";
import GhostModel from "./ghost.entity";
import { secret_ghost, secret_jwt } from "../../common/environment";
import * as jwt from 'jsonwebtoken';
import { AuthService } from "../auth/auth.service";
import { createToken, scrubTokenData } from "../../common/functions";

@Component()
export class GhostService {
    constructor(
        @Inject(ghostProviderToken)
        private readonly Ghost: typeof GhostModel
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
            const user = jwt.decode(token);
            scrubTokenData(user);
            await ghost.destroy();
            return createToken(user, secret_jwt, 60 * 60);
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