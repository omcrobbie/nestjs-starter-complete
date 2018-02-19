import { userProviderToken, dbConnectionToken } from "../../common/constants";
import  User  from "./user.entity";

export const userProviders = [
    {
        provide: userProviderToken,
        useValue: User,
    }
]