import { Controller, Post, Body, HttpStatus } from "@nestjs/common";
import { GhostService } from "./ghost.service";
import { Auth } from "../auth/auth.decorator";
import { CreateGhostDto, ExchangeGhostDto } from "./ghost.dto";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { HttpException } from "@nestjs/core";

@Auth(true)
@Controller('ghost')
export class GhostController {
    constructor(
        private readonly ghostService: GhostService
    ) {}
    @Post()
    createGhost(@Body() data: CreateGhostDto) {
        return this.ghostService.createGhost(data);
    }
    @Post('exchange')
    async exchangeTokens(@Body() data: ExchangeGhostDto) {
       const token = await this.ghostService.exchangeGhostToken(data);
       if (token) {
        return token;
       }
       throw new HttpException('token is not valid', HttpStatus.FORBIDDEN); 
    }

}