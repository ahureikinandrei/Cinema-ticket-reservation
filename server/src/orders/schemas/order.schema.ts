import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Session } from '../../sessions/schemas/session.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  })
  session: Session;

  @Prop()
  seats: [
    {
      type: { type: number };
      size: number;
      _id: string;
      row: number;
      seat: number;
    },
  ];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
