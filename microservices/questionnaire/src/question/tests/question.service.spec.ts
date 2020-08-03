import { Test } from '@nestjs/testing';
import { QuestionService } from '../question.service';
import { QuestionSchema } from '../question.schema';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from '../../../test/db.module.config';
import { NotFoundException } from '@nestjs/common';

describe('QuestionService', () => {
  let questionService;

  const questionDto = {
    title: 'Test title',
    description: 'Test description',
    recommendation: 'Test recommendation',
    reviewCategoryId: '5f17d5b3cb7118704f3d71a6',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        dbConfig(),

        MongooseModule.forFeature([
          { name: 'Question', schema: QuestionSchema },
        ]),
      ],
      providers: [QuestionService],
    }).compile();

    questionService = await module.get<QuestionService>(QuestionService);
  });

  describe('Create Operations', () => {
    it('add question from model', async () => {
      const question = await questionService.addQuestion(questionDto);

      expect(question.title).toBe('Test title');
    });
  });

  describe('Get Operations', () => {
    it('get question from model by id', async () => {
      const addedQuestion = await questionService.addQuestion(questionDto);
      const question = await questionService.getQuestionById(addedQuestion.id);

      expect(question.title).toBe('Test title');
    });

    it('get questions from model', async () => {
      const questions = await questionService.getQuestions();

      expect(questions).toHaveLength(0);
    });
  });

  describe('Update Operations', () => {
    it('update category', async () => {
      const question = await questionService.addQuestion(questionDto);

      const updatedQuestion = await questionService.updateQuestion(
        question._id,
        { title: 'New test title' },
      );

      expect(updatedQuestion).toBeUndefined();
    });

    it('on update question, should throw exception', () => {
      expect(
        async () =>
          await questionService.updateQuestion(1, { title: 'Test title' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('Delete Operations', () => {
    it('delete question', async () => {
      const question = await questionService.addQuestion(questionDto);

      const deletedQuestion = await questionService.deleteQuestion(
        question._id,
      );

      expect(deletedQuestion).toBeUndefined();
    });

    it('on delete question, should throw exception', () => {
      expect(
        async () => await questionService.deleteQuestion(1),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
