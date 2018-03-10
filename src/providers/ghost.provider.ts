import { ghostProviderToken } from "../common/constants";
import GhostModel from "../entity/ghost/ghost.entity";

export const ghostProviders = [
    {
        provide: ghostProviderToken,
        useValue: GhostModel
    }
];