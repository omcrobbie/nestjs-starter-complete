import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { userProviders } from "../providers/user.provider";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    components: [
        ...userProviders,
        UserService
    ]
})
export class UserModule {}