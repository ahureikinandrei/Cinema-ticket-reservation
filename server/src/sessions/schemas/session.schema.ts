import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Film } from '../../films/schemas/film.schema';
import { Cinema } from '../../cinema/schemas/cinema.schema';
import { Hall } from '../../hall/schemas/hall.schema';
import { Price } from '../../prices/schemas/price.schema';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop()
  date: string;

  @Prop()
  time: string;

  @Prop()
  freeSeats: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
  })
  film: Film;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cinema',
  })
  cinema: Cinema;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hall',
  })
  hall: Hall;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Price',
  })
  price: Price;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
