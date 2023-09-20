import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// GPT-4 indicated we should import ValidationPipe from @nestjs/common and use it setGlobalPrefix.
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  // Now we use the ValidationPipe to setGlobalPrefix.
  // old code: app.setGlobalPrefix('api');
  app.setGlobalPrefix('api').useGlobalPipes(new ValidationPipe({ transform: true }));

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.log(err);
});
