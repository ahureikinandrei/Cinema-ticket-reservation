import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from '../../orders/schemas/order.schema';
import { Roles } from '../types/roles.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Roles.User })
  role: string;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Order',
      },
    ],
  })
  orders: Order[];
}

export const UserSchema = SchemaFactory.createForClass(User);
