import { createConnection } from 'typeorm';
import { Sequelize } from 'sequelize-typescript';
import { dbConnectionToken } from '../../common/constants';

export const databaseProviders = [
  {
    provide: dbConnectionToken,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'macbookair',
        password: '',
        database: 'postgres',
        modelPaths: [__dirname + '/../**/*.entity.ts'],
        logging: false
      });
      await sequelize.sync();
      return sequelize;
    }
  },
];