import {
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question } from './question.schema';
import QuestionDto from './dtos/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel('Question')
    private questionModel: Model<Question>,
  ) {}

  private logger = new Logger('ReviewCategoryService');

  /**
   *
   * @param questionId - Question id
   * @description - Get specific question via id
   */
  async getQuestionById(questionId: string): Promise<Question> {
    try {
      return this.findQuestion(questionId);
    } catch (e) {
      this.logger.error(`Failed to get question for id ${questionId}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * @description - Get all Questions
   */
  async getQuestions(): Promise<Question[]> {
    try {
      return this.questionModel.find({
        isActive: true,
      });
    } catch (e) {
      this.logger.error(`Failed to get all questions`);

      throw new InternalServerErrorException();
    }
  }

  /**
   *
   * @param questionDto - Question DTO
   * @description - Adds a question
   */
  async addQuestion(questionDto: QuestionDto): Promise<Question> {
    const {
      title,
      description,
      recommendation,
      reviewCategoryId,
    } = questionDto;

    const question = new this.questionModel({
      title,
      description,
      recommendation,
      reviewCategoryId,
    });

    try {
      return question.save();
    } catch (e) {
      this.logger.error(`Failed to get add question`);

      throw new InternalServerErrorException();
    }
  }

  /**
   *
   * @param questionId - question id
   * @param questionDto - question's DTO
   * @description - Updates the question
   */
  async updateQuestion(
    questionId: string,
    questionDto: QuestionDto,
  ): Promise<any> {
    const updatedQuestion = await this.findQuestion(questionId);

    const {
      title,
      description,
      recommendation,
      reviewCategoryId,
    } = questionDto;

    if (title) {
      updatedQuestion.title = title;
    }

    if (description) {
      updatedQuestion.description = description;
    }

    if (recommendation) {
      updatedQuestion.recommendation = recommendation;
    }

    if (reviewCategoryId) {
      updatedQuestion.reviewCategoryId = reviewCategoryId;
    }

    try {
      updatedQuestion.save();
    } catch (e) {
      this.logger.error(`Failed to update question for id ${questionId}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   *
   * @param questionId - question id
   * @description - Deletes the question
   */
  async deleteQuestion(questionId: string): Promise<any> {
    const deletedQuestion = await this.findQuestion(questionId);

    deletedQuestion.isActive = false;

    try {
      // deletedQuestion.save();
    } catch (e) {
      this.logger.error(`Failed to delete question for id ${questionId}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   *
   * @param questionId
   * @description - Get question via id
   */
  private async findQuestion(questionId: string): Promise<Question> {
    let question;

    try {
      question = await this.questionModel.findById(questionId);
    } catch (error) {
      this.logger.error(`Failed to find question for id ${questionId}`);

      throw new NotFoundException('Could not find question.');
    }

    if (!question || !question.isActive) {
      this.logger.error(`Question not found for id ${questionId}`);

      throw new NotFoundException('Could not find question.');
    }
    return question;
  }
}
