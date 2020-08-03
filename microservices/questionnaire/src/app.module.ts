import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { ReviewCategoryModule } from './review-category/review-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('database.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    QuestionModule,
    ReviewCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
