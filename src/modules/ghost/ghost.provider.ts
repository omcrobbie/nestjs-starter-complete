import { ghostProviderToken } from "../../common/constants";
import GhostModel from "./ghost.entity";

export const ghostProviders = [
    {
        provide: ghostProviderToken,
        useValue: GhostModel
    }
];