import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ReviewCategory extends Document {
  @Prop({ required: true })
  name: string;

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

export const ReviewCategorySchema = SchemaFactory.createForClass(
  ReviewCategory,
);
