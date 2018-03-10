import { Guard } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common/interfaces";
import { Reflector } from "@nestjs/core";
import * as jwt from 'jsonwebtoken';
import { Observable } from "rxjs/Observable";
import { AuthService } from "../services/auth.service";


@Guard()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector
    ){}
    canActivate(request: any, context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { parent, handler } = context;
        const noAuth = this.reflector.get<boolean>('bypass', parent);
        if (noAuth) {
            return true;
        }
        return this.authService.validateToken(request);
        
    }
}