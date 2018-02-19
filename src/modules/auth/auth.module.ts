import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./auth.controller";
import { userProviders } from "../user/user.provider";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { UserService } from "../user/user.service";

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    components: [
        ...userProviders,
        AuthService,
        UserService,
        AuthGuard
    ]
})
export class AuthModule {}
