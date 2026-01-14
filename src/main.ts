import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import path, { join } from 'path';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  //app.enableCors({ origin: true, credentials: true });
  /*app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: ['Content-Type'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    

  });*/
  console.log('Serving static from:', join(__dirname, '..', '../upload'));
  // Use helmet with Cross-Origin-Resource-Policy header
  /*app.use(
      helmet({
          crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow cross-origin resources
      }),
  );*/

  // app.useStaticAssets(join(__dirname, '..', '../upload'),  { prefix: '/image' });
  // app.use('/static', express.static(join(process.cwd(), 'upload')));

  app.use(express.static('upload'))
  app.use('/upload', express.static('upload'))
  /* app.use('/public', express.static('upload'))
  app.use('/up', express.static(join(__dirname, '..', '../upload')))
  app.use('/static', express.static(join(process.cwd(), '../upload')));
*/

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
