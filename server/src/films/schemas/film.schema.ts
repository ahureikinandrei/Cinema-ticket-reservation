import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
  @Prop({
    unique: true,
    required: true,
  })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: true })
  rating: string;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
