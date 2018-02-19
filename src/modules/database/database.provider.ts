import { createConnection } from 'typeorm';
import { Sequelize } from 'sequelize-typescript';
import { dbConnectionToken } from '../../common/constants';
import * as env from '../../common/environment';

export const databaseProviders = [
  {
    provide: dbConnectionToken,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: env.db_host,
        port: parseInt(env.db_port),
        username: env.db_userName,
        password: env.db_password,
        database: env.db_database,
        modelPaths: [__dirname + '/../**/*.entity.ts'],
        logging: false
      });
      await sequelize.sync();
      return sequelize;
    }
  },
];