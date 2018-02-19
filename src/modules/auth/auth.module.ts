import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./auth.controller";
import { userProviders } from "../user/user.provider";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { AuthMiddleware } from "./auth.middleware";

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    components: [
        ...userProviders,
        AuthService,
        AuthGuard
    ]
})
export class AuthModule {}
