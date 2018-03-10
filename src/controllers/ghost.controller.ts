import { Controller, Post, Body, HttpStatus, ForbiddenException } from "@nestjs/common";
import { GhostService } from "../services/ghost.service";
import { Auth } from "../common/auth.decorator";
import { CreateGhostDto, ExchangeGhostDto } from "../entity/ghost/ghost.dto";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
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
       throw new ForbiddenException(); 
    }

}