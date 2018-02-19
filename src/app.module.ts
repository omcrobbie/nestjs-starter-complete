import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { GhostModule } from './modules/ghost/ghost.module';

@Module({
  imports: [UserModule, AuthModule, GhostModule],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: '*', method: RequestMethod.ALL}
    );
  }
}
