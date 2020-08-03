import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  recommendation: string;

  @Prop({ required: true })
  reviewCategoryId: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
