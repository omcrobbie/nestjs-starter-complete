import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { GhostModule } from './modules/ghost.module';

@Module({
  imports: [UserModule, AuthModule, GhostModule],
  controllers: [],
  components: [],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: '*', method: RequestMethod.ALL}
    );
  }
}
