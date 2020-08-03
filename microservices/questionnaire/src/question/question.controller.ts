import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { QuestionService } from './question.service';
import { Question } from './question.schema';
import QuestionDto from './dtos/question.dto';

@Controller('question')
@UseGuards(AuthGuard())
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/:id')
  getQuestionById(@Param('id') id: string): Promise<Question> {
    return this.questionService.getQuestionById(id);
  }

  @Get()
  getQuestions(): Promise<Question[]> {
    return this.questionService.getQuestions();
  }

  @Post()
  addQuestion(@Body() questionDto: QuestionDto): Promise<Question> {
    return this.questionService.addQuestion(questionDto);
  }

  @Put('/:id')
  @HttpCode(204)
  async updateQuestion(
    @Param('id') questionId: string,
    @Body() questionDto: QuestionDto,
  ): Promise<any> {
    await this.questionService.updateQuestion(questionId, questionDto);

    return null;
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteQuestion(@Param('id') id: string): Promise<any> {
    await this.questionService.deleteQuestion(id);

    return null;
  }
}
