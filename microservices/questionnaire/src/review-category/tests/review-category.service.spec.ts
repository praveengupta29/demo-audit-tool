import { Test } from '@nestjs/testing';
import { ReviewCategoryService } from '../review-category.service';
import { ReviewCategorySchema } from '../review-category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from '../../../test/db.module.config';
import { NotFoundException } from '@nestjs/common';
import mockUser from '../../auth/tests/user-payload.mock.json';

describe('ReviewCategoryService', () => {
  let reviewCategoryService;
  const categoryName = 'Functional';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        dbConfig(),

        MongooseModule.forFeature([
          { name: 'ReviewCategory', schema: ReviewCategorySchema },
        ]),
      ],
      providers: [ReviewCategoryService],
    }).compile();

    reviewCategoryService = await module.get<ReviewCategoryService>(
      ReviewCategoryService,
    );
  });

  describe('Create Operations', () => {
    it('add category from model', async () => {
      const cat = await reviewCategoryService.createCategory(
        categoryName,
        mockUser,
      );

      expect(cat.name).toBe(categoryName);
    });
  });

  describe('Get Operations', () => {
    it('get category by id from model', async () => {
      const cat = await reviewCategoryService.createCategory(
        categoryName,
        mockUser,
      );

      const category = await reviewCategoryService.getCategoryById(cat.id);

      expect(category.name).toBe(categoryName);
    });

    it('get categories from model', async () => {
      const cats = await reviewCategoryService.getCategories();

      expect(cats).toHaveLength(0);
    });
  });

  describe('Update Operations', () => {
    it('update category', async () => {
      const cat = await reviewCategoryService.createCategory(
        categoryName,
        mockUser,
      );

      const updatedCategory = await reviewCategoryService.updateCategory(
        cat._id,
        'Operational',
        mockUser,
      );

      expect(updatedCategory).toBeUndefined();
    });

    it('on update category, should throw exception', () => {
      expect(
        async () =>
          await reviewCategoryService.updateCategory(1, 'Operational'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('Delete Operations', () => {
    it('delete category', async () => {
      const cat = await reviewCategoryService.createCategory(
        categoryName,
        mockUser,
      );

      const deletedCategory = await reviewCategoryService.deleteCategory(
        cat._id,
      );

      expect(deletedCategory).toBeUndefined();
    });

    it('on delete category, should throw exception', () => {
      expect(
        async () => await reviewCategoryService.deleteCategory(1),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
