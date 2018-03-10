import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { ghostProviders } from "../providers/ghost.provider";
import { GhostController } from "../controllers/ghost.controller";
import { GhostService } from "../services/ghost.service";
import { userProviders } from "../providers/user.provider";
import { envProviders } from "../providers/env.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [GhostController],
    components: [
        ...ghostProviders,
        ...userProviders,
        ...envProviders,
        GhostService
    ]
})
export class GhostModule {}