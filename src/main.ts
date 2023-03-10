import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port: number = app.get(ConfigService).get('API_PORT');
  await app.listen(port);
}
bootstrap();
