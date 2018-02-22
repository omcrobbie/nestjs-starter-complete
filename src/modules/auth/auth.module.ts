import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./auth.controller";
import { userProviders } from "../user/user.provider";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { UserService } from "../user/user.service";
import { envProviders } from "../../common/env.provider";

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
