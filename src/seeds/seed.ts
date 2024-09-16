import { DatabaseSeederModule } from '@/infrastructure/modules/tenant';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(DatabaseSeederModule);
  await app.close();
}

bootstrap();
