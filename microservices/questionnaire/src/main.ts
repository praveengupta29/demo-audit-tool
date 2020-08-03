import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import config from '../config/configuration';

async function bootstrap() {
  const port = config().port;

  const app = await NestFactory.create(AppModule, { bodyParser: true });

  await app.listen(port);

  const logger = new Logger('Bootstrap');

  logger.log(`Questionnaire service is listening at ${port}`);
}
bootstrap();
