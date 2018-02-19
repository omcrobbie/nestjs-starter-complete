import { Middleware, NestMiddleware, ExpressMiddleware } from "@nestjs/common";
import { AuthService } from "../modules/auth/auth.service";
import { IRequest } from "../common/interfaces";
import { UserService } from "../modules/user/user.service";

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}
    resolve(...args: any[]): ExpressMiddleware  {
        return async (req: IRequest, res, next) => {
            if (this.authService.validateToken(req)) {
                const user = this.authService.decodeUser(req);
                req.user = await this.userService.findOne(user['id'])
            }
            next();
        }
    }
}