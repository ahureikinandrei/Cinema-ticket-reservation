import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HallDocument = Hall & Document;

@Schema()
export class Hall {
  @Prop({
    unique: true,
    required: true,
  })
  name: string;

  @Prop()
  rowSize: number;

  @Prop()
  schema: [
    [
      {
        type: { type: string };
        size: number;
      },
    ],
  ];
}

export const HallSchema = SchemaFactory.createForClass(Hall);
