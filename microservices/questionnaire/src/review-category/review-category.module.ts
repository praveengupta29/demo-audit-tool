import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';

import { ReviewCategoryController } from './review-category.controller';
import { ReviewCategoryService } from './review-category.service';
import { ReviewCategorySchema } from './review-category.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'ReviewCategory', schema: ReviewCategorySchema },
    ]),
  ],
  controllers: [ReviewCategoryController],
  providers: [ReviewCategoryService],
})
export class ReviewCategoryModule {}
