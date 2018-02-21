import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UserModule } from '../modules/user/user.module';
import { AuthModule } from '../modules/auth/auth.module';
import { GhostModule } from '../modules/ghost/ghost.module';
import { dbConnectionToken, userProviderToken, ghostProviderToken, envProviderToken } from '../common/constants';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseModule } from '../modules/database/database.module';
import { databaseProviders } from '../modules/database/database.provider';
import { Inject, INestApplication } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import UserModel from '../modules/user/user.entity';
import GhostModel from '../modules/ghost/ghost.entity';
import { AuthService } from '../modules/auth/auth.service';
import { GhostService } from '../modules/ghost/ghost.service';
import { UserController } from '../modules/user/user.controller';
import { AuthController } from '../modules/auth/auth.controller';
import { GhostController } from '../modules/ghost/ghost.controller';
import { AuthGuard } from '../modules/auth/auth.guard';
import { envProviders } from '../common/env.provider';
const testProviders = [
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
let userService: UserService;
let ghostService: GhostService;
let app: INestApplication;
describe('user account creation', () => {
    const server = express();
    let ghostToken;
    let loginToken;
    beforeAll(async () => {
        const appModule = await Test.createTestingModule({
            components: [
                ...testProviders,
                UserService,
                AuthService,
                GhostService,
                AuthGuard
            ],
            controllers: [
                UserController,
                AuthController,
                GhostController
            ]
        })
        .compile();
        const app = appModule.createNestApplication(server);
        await app.init();
        userService = app.get<UserService>(UserService);
        ghostService = app.get<GhostService>(GhostService);
    });
    afterAll(() => {
        app.close();
    });
    it('create ghost user', async () => {
        const payload = {
            name: 'testy',
            password: '123password'
        };
        const res = await request(server)
            .post('/ghost')
            .send(payload)
            .expect(201)
        expect(res.body.token).toBeDefined;
        ghostToken = res.body.token;
    });
    it('exchange ghost token for real one', async () => {
        const payload = {
            token: ghostToken
        };
        const res = await request(server)
            .post('/ghost/exchange')
            .send(payload);
        expect(res.body.token).toBeDefined;
    });
});