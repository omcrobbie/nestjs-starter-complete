import { NestFactory, NestApplication } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {
	const app: NestApplication = await NestFactory.create(ApplicationModule);
	const authGuard = app
		.select(AuthModule)
		.get(AuthGuard);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalGuards(authGuard);
	await app.listen(3000);
}
bootstrap();
