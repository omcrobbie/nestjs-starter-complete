import { Controller, Post, Body, HttpCode, HttpException, HttpStatus, Get, Req, ForbiddenException, NotFoundException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Auth } from "./auth.decorator";
import { LoginDto } from "./auth.dto";
import { IRequest } from "../../common/interfaces";
import { UserService } from "../user/user.service";

@Auth(true)
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService 
    ) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto ) {
        const token = await this.authService.validateUser(loginDto);
        if (!token) {
            throw new ForbiddenException();
        }
        return token;
    }
    @Get('user')
    getUser(@Req() request: IRequest) {
        if (request.userId) {
            return this.userService.findOne(request.userId);
        }
        throw new NotFoundException();
    }
}