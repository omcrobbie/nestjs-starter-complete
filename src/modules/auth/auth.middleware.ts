import { Middleware, NestMiddleware, ExpressMiddleware } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IRequest } from "../../common/interfaces";

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly authService: AuthService
    ){}
    resolve(...args: any[]): ExpressMiddleware  {
        return async (req: IRequest, res, next) => {
            if (this.authService.validateToken(req)) {
                const user = this.authService.decodeUser(req);
                req.user = await this.authService.fetchUser(user['id'])
            }
            next();
        }
    }
}