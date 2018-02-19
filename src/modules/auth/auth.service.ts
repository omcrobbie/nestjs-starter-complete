import { Component, Inject, HttpException, HttpStatus } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import UserModel from "../user/user.entity";
import { userProviderToken } from "../../common/constants";
import { secret_jwt } from "../../common/environment";


@Component()
export class AuthService {
    constructor(
        @Inject(userProviderToken)
        private readonly User: typeof UserModel
    ) {}
    async createToken(user: any) {
        const expiresIn = 60 * 60;
        const secretKey = secret_jwt;
        const token = jwt.sign(user, secretKey, {expiresIn});
        return { expiresIn, token };
    }
    async validateUser({name, password}) {
        const loginUser = await this.User.findOne({
            where: { name }
        });
        if (loginUser && loginUser.checkPw(password)) {
            return this.createToken({id:loginUser.id});
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
                jwt.verify(token, secret_jwt);
                return true;
            } catch (err) {
                return false;
            }
        }
        return false;
    }

}