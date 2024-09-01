import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RoleExceptionFilter } from './infrastructure/exceptions/role-exception.filter';
import * as dotenv from 'dotenv';

function loadEnv() {
  const environment = process.env.NODE_ENV || 'development';
  console.log(process.env.NODE_ENV);
  const envFile = `.env.${environment}`;

  console.log(`Loading environment from ${envFile}`);

  dotenv.config({ path: envFile });
}

async function bootstrap() {
  loadEnv();
  
  const app = await NestFactory.create(AppModule);
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Roles API')
    .setDescription('API para gestionar roles')
    .setVersion('1.0')
    .addTag('roles')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalFilters(new RoleExceptionFilter());
  await app.listen(3000);
}
bootstrap();
