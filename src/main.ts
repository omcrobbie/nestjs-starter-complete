import { NestFactory, NestApplication } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';

async function bootstrap() {
	const app: NestApplication = await NestFactory.create(ApplicationModule);
	const authGuard = app
		.select(AuthModule)
		.get(AuthGuard);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalGuards(authGuard);
	const options = new DocumentBuilder()
		.setTitle('Sample api')
		.setDescription('Sample api description')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('/api', app, document);
	app.use(morgan('dev'));
	await app.listen(3000);
}
bootstrap();
