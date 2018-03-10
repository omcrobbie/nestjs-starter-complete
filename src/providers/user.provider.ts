import { userProviderToken, dbConnectionToken } from "../common/constants";
import  UserModel  from "../entity/user/user.entity";

export const userProviders = [
    {
        provide: userProviderToken,
        useValue: UserModel,
    }
]