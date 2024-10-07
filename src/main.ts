import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payload to DTO
      whitelist: true, // Strip properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error for non-whitelisted properties
    }),
  );
  app.enableCors();
  const configService = app.get(ConfigService);
  console.log('PORT', configService.get<number>('PORT'));
  const port = configService.get<number>('PORT') || 8080;
  await app.listen(port);
}
bootstrap();
