import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PriceDocument = Price & Document;

@Schema()
export class Price {
  @Prop(
    raw({
      simple: { type: String },
      love: { type: String },
      prime: { type: String },
    }),
  )
  seatPrice: {
    simple: { type: string };
    love: { type: string };
    prime: { type: string };
  };

  @Prop()
  seatsStatus: [[boolean]];
}

export const PriceSchema = SchemaFactory.createForClass(Price);
