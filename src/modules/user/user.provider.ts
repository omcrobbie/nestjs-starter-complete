import { userProviderToken, dbConnectionToken } from "../../common/constants";
import  UserModel  from "./user.entity";

export const userProviders = [
    {
        provide: userProviderToken,
        useValue: UserModel,
    }
]