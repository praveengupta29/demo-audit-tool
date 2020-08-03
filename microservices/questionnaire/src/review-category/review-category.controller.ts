import {
  Controller,
  Delete,
  HttpCode,
  Get,
  Patch,
  Post,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

import { ReviewCategoryService } from './review-category.service';
import { ReviewCategory } from './review-category.schema';

@Controller('review-category')
@UseGuards(AuthGuard())
export class ReviewCategoryController {
  constructor(private readonly categoryService: ReviewCategoryService) {}

  @Get('/:id')
  getCategoryById(@Param('id') id: string): Promise<ReviewCategory> {
    return this.categoryService.getCategoryById(id);
  }

  @Get()
  getCategories(): Promise<ReviewCategory[]> {
    return this.categoryService.getCategories();
  }

  @Post()
  createCategory(
    @Body('name') categoryName: string,
    @GetUser() user: JwtPayload,
  ): Promise<ReviewCategory> {
    return this.categoryService.createCategory(categoryName, user);
  }

  @Patch('/:id')
  @HttpCode(204)
  async updateCategory(
    @Param('id') categoryId: string,
    @Body('name') categoryName: string,
    @GetUser() user: JwtPayload,
  ): Promise<any> {
    await this.categoryService.updateCategory(categoryId, categoryName, user);

    return null;
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteCategory(@Param('id') id: string): Promise<any> {
    await this.categoryService.deleteCategory(id);

    return null;
  }
}
