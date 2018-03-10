import { dbConnectionToken, envProviderToken, userProviderToken, ghostProviderToken } from "../common/constants";
import { Sequelize } from "sequelize-typescript";
import UserModel from "../entity/user/user.entity";
import GhostModel from "../entity/ghost/ghost.entity";

export const testProviders = [
    {
        provide: dbConnectionToken,
        useFactory: async () => {
          const sequelize = new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'macbookair',
            password: '',
            database: 'testdb',
            logging: false
          });
          sequelize.addModels([
                UserModel,
                GhostModel
          ]);
          await sequelize.sync({force: true});
          return sequelize;
        }
      },
      {
        provide: envProviderToken,
        useValue: {
            secret_jwt: 'secret',
            secret_ghost: 'ghost'
        }
      },
      {
          provide: ghostProviderToken,
          useValue: GhostModel
      },
      {
          provide: userProviderToken,
          useValue: UserModel
      }
];

export const authMiddleware = (userId) => {
    return (req, res, next) => {
        req['userId'] = userId;
        next();
    };
};
