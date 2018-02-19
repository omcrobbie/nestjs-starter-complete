import { Controller, Post, Body, HttpCode, HttpException, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Auth } from "./auth.decorator";
import { LoginDto } from "./auth.dto";

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
}