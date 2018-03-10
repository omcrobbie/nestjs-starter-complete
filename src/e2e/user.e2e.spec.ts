import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { GhostService } from '../services/ghost.service';
import { UserController } from '../controllers/user.controller';
import { AuthController } from '../controllers/auth.controller';
import { GhostController } from '../controllers/ghost.controller';
import { AuthGuard } from '../guards/auth.guard';
import { testProviders, authMiddleware } from './e2e.util';
import { UserService } from '../services/user.service';
import { INestApplication } from '@nestjs/common';

let userService: UserService;
let ghostService: GhostService;
let app: INestApplication
let ghostToken;
let loginToken;
const user = {
    name: 'testy',
    password: '123password'
};
describe('user account creation', () => {
    const server = express();
    server.use(authMiddleware(1));
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
        const authGuard = app.get<AuthGuard>(AuthGuard);
        app.useGlobalGuards(authGuard);
        await app.init();
        userService = app.get<UserService>(UserService);
        ghostService = app.get<GhostService>(GhostService);
    });
    afterAll(async () => {
        await app.close();
    });
    it('create ghost user', async () => {
        const res = await request(server)
            .post('/ghost')
            .send(user)
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
        loginToken = res.body.token;
    });
    it('should get the user', async () => {
        const res = await request(server)
            .get('/auth/user')
            .set('Authorization', loginToken)
            .expect(200);
        const {name, password } = res.body;
        expect(name).toEqual(user.name);
    });
    it('should not get the data', () => {
        return request(server)
            .get('/user')
            .expect(403);
    });
    it('should get the data using token', async () => {
        const res = await request(server)
            .get('/user')
            .set('Authorization', loginToken)
            .expect(200);
        expect(res.body).toHaveLength(1);
    });
});