import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { RoleExceptionFilter } from './infrastructure/exceptions/role-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

function loadEnv() {
  dotenv.config();
}

async function bootstrap() {
  loadEnv();
  const app = await NestFactory.create(AppModule);
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Arly 2.0 API')
    .setDescription('API para Arly 2.0')
    .setVersion('1.0')
    .addTag('arly')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalFilters(new RoleExceptionFilter());
  await app.listen(process.env.PORT || 3000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
}
bootstrap();
