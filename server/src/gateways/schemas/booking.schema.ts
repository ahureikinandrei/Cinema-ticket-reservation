import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type BookedSeatDocument = BookedSeat & Document;

@Schema()
export class BookedSeat {
  @Prop({
    unique: true,
    required: true,
  })
  socketID: string;

  @Prop()
  sessionID: string;

  @Prop()
  createdDate: Date;

  @Prop({
    type: Boolean,
    default: false,
  })
  isProcessBuying: boolean;

  @Prop([String])
  bookedSeats: mongoose.Types.Array<string>;
}

export const BookedSeatSchema = SchemaFactory.createForClass(BookedSeat);
