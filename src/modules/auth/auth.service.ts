import { Component, Inject, HttpException, HttpStatus } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import User from "../user/user.entity";
import { userProviderToken, jwtSecret } from "../../common/constants";


@Component()
export class AuthService {
    constructor(
        @Inject(userProviderToken)
        private readonly user: typeof User
    ) {}
    async createToken(user: any) {
        const expiresIn = 60 * 60;
        const secretKey = jwtSecret;
        const token = jwt.sign(user, secretKey, {expiresIn});
        return { expiresIn, token };
    }
    async validateUser({name, password}) {
        const loginUser = await this.user.findOne({
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
                jwt.verify(token, jwtSecret);
                return true;
            } catch (err) {
                return false;
            }
        }
        return false;
    }

}