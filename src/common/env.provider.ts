import { envProviderToken } from "./constants";
import * as env from '../common/environment';

export const Env = {...env};

export const envProviders = [
    {
        provide: envProviderToken,
        useValue: Env
    }
];