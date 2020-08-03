import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';

import { QuestionController } from '../question.controller';
import { QuestionService } from '../question.service';
import QuestionDto from '../dtos/question.dto';

describe('QuestionController', () => {
  let questionController: QuestionController;
  let questionService: QuestionService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useFactory: () => ({
            addQuestion: jest.fn(() => {}),
            deleteQuestion: jest.fn(() => undefined),
            updateQuestion: jest.fn(() => undefined),
            getQuestions: jest.fn(() => []),
            getQuestionById: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    questionController = app.get<QuestionController>(QuestionController);

    questionService = app.get<QuestionService>(QuestionService);
  });

  describe('CRUD Operations', () => {
    let questionId;

    beforeAll(() => {
      questionId = '2334';
    });

    it('should create question', () => {
      const params: QuestionDto = {
        title: 'Test Title',
        description: 'Test description',
        recommendation: 'Test recommendation',
        reviewCategoryId: '8392383',
      };
      questionController.addQuestion(params);

      expect(questionService.addQuestion).toHaveBeenCalledWith(params);
    });

    it('should get question by `id`', () => {
      questionController.getQuestionById(questionId);

      expect(questionService.getQuestionById).toHaveBeenCalledWith(questionId);
    });

    it('should get all questions', () => {
      questionController.getQuestions();

      expect(questionService.getQuestions).toHaveBeenCalled();
    });

    it('should update question', () => {
      const params: QuestionDto = {
        title: 'Test Title',
        description: 'Test description',
        recommendation: 'Test recommendation',
        reviewCategoryId: '8392383',
      };
      questionController.updateQuestion(questionId, params);

      expect(questionService.updateQuestion).toHaveBeenCalledWith(
        questionId,
        params,
      );
    });

    it('should delete category', () => {
      questionController.deleteQuestion(questionId);

      expect(questionService.deleteQuestion).toHaveBeenCalledWith(questionId);
    });
  });
});
