import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ghostProviders } from "./ghost.provider";
import { GhostController } from "./ghost.controller";
import { GhostService } from "./ghost.service";

@Module({
    imports: [DatabaseModule],
    controllers: [GhostController],
    components: [
        ...ghostProviders,
        GhostService
    ]
})
export class GhostModule {}