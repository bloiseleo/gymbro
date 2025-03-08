import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function buildSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('MyGymBro')
    .setDescription('MyGymBro API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  buildSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
