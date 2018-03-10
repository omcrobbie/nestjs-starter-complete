import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { AuthController } from "../controllers/auth.controller";
import { userProviders } from "../providers/user.provider";
import { AuthService } from "../services/auth.service";
import { AuthGuard } from "../guards/auth.guard";
import { UserService } from "../services/user.service";
import { envProviders } from "../providers/env.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    components: [
        ...userProviders,
        ...envProviders,
        AuthService,
        UserService,
        AuthGuard
    ]
})
export class AuthModule {}
