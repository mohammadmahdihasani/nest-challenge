import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe()); //for class validator PipeLine
  await app.listen(process.env.APPLICATION_PORT);
  console.log(`Application running on port ${process.env.APPLICATION_PORT}`) 
}
bootstrap();
