import { Component, Inject, HttpException, HttpStatus } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import UserModel from "../user/user.entity";
import { userProviderToken, envProviderToken } from "../../common/constants";
import { createToken } from "../../common/functions";
import { Env } from "../../common/env.provider";


@Component()
export class AuthService {
    constructor(
        @Inject(userProviderToken)
        private readonly User: typeof UserModel,
        @Inject(envProviderToken)
        private readonly env: typeof Env
    ) {}
    async validateUser({name, password}) {
        const loginUser = await this.User.findOne({
            where: { name }
        });
        if (loginUser && loginUser.checkPw(password)) {
            return createToken({id:loginUser.id}, this.env.secret_jwt, 60 * 60);
        }
    }
    decodeUser(request) {
        const token = request.headers['authorization'];
        return jwt.decode(token);
    }
    validateToken(request) {
        const token = request.headers['authorization'];
        if (token) {
            try {
                jwt.verify(token, this.env.secret_jwt);
                return true;
            } catch (err) {
                return false;
            }
        }
        return false;
    }

}