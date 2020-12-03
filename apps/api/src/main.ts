/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import 'dotenv/config';
import { ConfigService } from './app/config/config.service';
import * as helmet from 'helmet';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // custom config
  app.enableCors();

  // middleware
  app.use(logger);

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );

  // Link DI container to class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const port = process.env.PORT;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix)
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();

// middleware
export function logger(req, res, next) {
  const reqToken = 'token';
  const startTime = new Date();
  const logreq = {
    '@timestamp': startTime.toISOString(),
    '@Id': reqToken,
    query: req.query,
    params: req.params,
    url: req.url,
    fullUrl: req.originalUrl,
    method: req.method,
    headers: req.headers,
    _parsedUrl: req._parsedUrl
  };

  // console.log(`Request:`, logreq);


  const cleanup = () => {
    res.removeListener('finish', logFn);
    res.removeListener('close', abortFn);
    res.removeListener('error', errorFn);
  };

  const logFn = () => {
    const endTime = new Date();
    cleanup();
    const logres = {
      '@timestamp': endTime.toISOString(),
      '@Id': reqToken,
      queryTime: endTime.valueOf() - startTime.valueOf()
    };
    // console.log('Response:', logres);
  };

  const abortFn = () => {
    cleanup();
    console.warn('Request aborted by the client');
  };

  const errorFn = err => {
    cleanup();
    console.error(`Request pipeline error: ${err}`);
  };

  res.on('finish', logFn); // successful pipeline (regardless of its response)
  res.on('close', abortFn); // aborted pipeline
  res.on('error', errorFn); // pipeline internal error

  next();
}
