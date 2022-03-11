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
    simple: number;
    love: number;
    prime: number;
  };

  @Prop([
    [
      {
        type: { type: Number },
        size: { type: Number },
        isBought: {
          type: Boolean,
          default: false,
        },
      },
    ],
  ])
  seatsStatus: Array<
    [
      {
        type: { type: string };
        size: number;
        isBought: boolean;
      },
    ]
  >;

  @Prop()
  rowSize: number;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
