import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ReviewCategory } from './review-category.schema';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Injectable()
export class ReviewCategoryService {
  constructor(
    @InjectModel('ReviewCategory')
    private reviewCategoryModel: Model<ReviewCategory>,
  ) {}

  private logger = new Logger('ReviewCategoryService');

  /**
   *
   * @param categoryId - Category id
   * @description - Get specific category via id
   */
  async getCategoryById(categoryId: string): Promise<ReviewCategory> {
    try {
      return this.findReviewCategory(categoryId);
    } catch (e) {
      this.logger.error(`Failed to get category for id ${categoryId}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * @description - Get all categories
   */
  async getCategories(): Promise<ReviewCategory[]> {
    try {
      return this.reviewCategoryModel.find({
        isActive: true,
      });
    } catch (e) {
      this.logger.error(`Failed to get all categories`);

      throw new InternalServerErrorException();
    }
  }

  /**
   *
   * @param categoryName - Category name
   * @description - Creates a category
   */
  async createCategory(
    categoryName: string,
    user: JwtPayload,
  ): Promise<ReviewCategory> {
    try {
      const createdCat = new this.reviewCategoryModel({
        name: categoryName,
        createdBy: user.id,
      });

      return createdCat.save();
    } catch (e) {
      this.logger.error(`Failed to create category`);

      throw new InternalServerErrorException();
    }
  }

  /**
   *
   * @param categoryId - category id
   * @param name - category name
   * @description - Updates the category
   */
  async updateCategory(
    categoryId: string,
    name: string,
    user: JwtPayload,
  ): Promise<any> {
    const updatedCategory = await this.findReviewCategory(categoryId);
    if (name) {
      updatedCategory.name = name;
    }

    try {
      updatedCategory.updatedBy = user.id;
      updatedCategory.save();
    } catch (e) {
      this.logger.error(`Failed to update category for id ${categoryId}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   *
   * @param categoryId - category id
   * @description - Deletes the category
   */
  async deleteCategory(categoryId: string): Promise<any> {
    const deletedCategory = await this.findReviewCategory(categoryId);

    deletedCategory.isActive = false;

    try {
      deletedCategory.save();
    } catch (e) {
      this.logger.error(`Failed to delete category for id ${categoryId}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   *
   * @param categoryId
   * @description - Get category via id
   */
  private async findReviewCategory(
    categoryId: string,
  ): Promise<ReviewCategory> {
    let category: ReviewCategory;

    try {
      category = await this.reviewCategoryModel.findById(categoryId);
    } catch (error) {
      this.logger.error(`Failed to retrieve category for id ${categoryId}`);

      throw new NotFoundException('Could not find category.');
    }

    if (!category || !category.isActive) {
      this.logger.error(`Category not found for id ${categoryId}`);

      throw new NotFoundException('Could not find category.');
    }
    return category;
  }
}
