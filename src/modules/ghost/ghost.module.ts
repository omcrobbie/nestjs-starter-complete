import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ghostProviders } from "./ghost.provider";
import { GhostController } from "./ghost.controller";
import { GhostService } from "./ghost.service";
import { userProviders } from "../user/user.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [GhostController],
    components: [
        ...ghostProviders,
        ...userProviders,
        GhostService
    ]
})
export class GhostModule {}