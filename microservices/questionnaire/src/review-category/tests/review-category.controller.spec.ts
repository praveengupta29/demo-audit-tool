import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';

import { ReviewCategoryController } from '../review-category.controller';
import { ReviewCategoryService } from '../review-category.service';
import mockUser from '../../auth/tests/user-payload.mock.json';

describe('ReviewCategoryController', () => {
  let reviewCategoryController: ReviewCategoryController;
  let reviewCategoryService: ReviewCategoryService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [ReviewCategoryController],
      providers: [
        {
          provide: ReviewCategoryService,
          useFactory: () => ({
            createCategory: jest.fn(() => true),
            deleteCategory: jest.fn(() => true),
            updateCategory: jest.fn(() => undefined),
            getCategories: jest.fn(() => []),
            getCategoryById: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    reviewCategoryController = app.get<ReviewCategoryController>(
      ReviewCategoryController,
    );

    reviewCategoryService = app.get<ReviewCategoryService>(
      ReviewCategoryService,
    );
  });

  describe('CRUD Operations', () => {
    let categoryId;
    let categoryName;

    beforeAll(() => {
      categoryId = '2334';
      categoryName = 'Operational';
    });

    it('should create category', () => {
      reviewCategoryController.createCategory(categoryName, mockUser);

      expect(reviewCategoryService.createCategory).toHaveBeenCalledWith(
        categoryName,
        mockUser,
      );
    });

    it('should get category by `id`', () => {
      reviewCategoryController.getCategoryById(categoryId);

      expect(reviewCategoryService.getCategoryById).toHaveBeenCalledWith(
        categoryId,
      );
    });

    it('should get all categories', () => {
      reviewCategoryController.getCategories();

      expect(reviewCategoryService.getCategories).toHaveBeenCalled();
    });

    it('should update category', () => {
      reviewCategoryController.updateCategory(
        categoryId,
        categoryName,
        mockUser,
      );

      expect(reviewCategoryService.updateCategory).toHaveBeenCalledWith(
        categoryId,
        categoryName,
        mockUser,
      );
    });

    it('should delete category', () => {
      reviewCategoryController.deleteCategory(categoryId);

      expect(reviewCategoryService.deleteCategory).toHaveBeenCalledWith(
        categoryId,
      );
    });
  });
});
