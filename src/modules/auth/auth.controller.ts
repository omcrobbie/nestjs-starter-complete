import { Controller, Post, Body, HttpCode, HttpException, HttpStatus, Get, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Auth } from "./auth.decorator";
import { LoginDto } from "./auth.dto";
import { IRequest } from "../../common/interfaces";

@Auth(true)
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService 
    ) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto ) {
        const token = this.authService.validateUser(loginDto);
        if (!token) {
            throw new HttpException('bad token', HttpStatus.FORBIDDEN);
        }
        return token;
    }
    @Get('user')
    getUser(@Req() request: IRequest) {
        if (request.user) {
            return request.user;
        }
        throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
}