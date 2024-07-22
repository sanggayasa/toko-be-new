import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    rawBody: true,
  });
  // App Prefix
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  // App Body Parser
  app.useBodyParser('urlencoded', { extended: true });
  app.disable('x-powered-by');
  app.use(helmet());
  app.enableCors({
    origin: ['*', 'https://toko-peach.vercel.app','https://vercel.app','toko-peach.vercel.app', 'vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
