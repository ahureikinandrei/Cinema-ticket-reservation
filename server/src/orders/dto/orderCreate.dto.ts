import * as mongoose from 'mongoose';

export interface ISeatFullInfo {
  type: number;
  size: number;
  isBought: boolean;
  _id: string;
  row: number;
  seat: number;
}

export class OrderCreateDto {
  readonly sessionID: mongoose.Schema.Types.ObjectId;
  readonly priceID: mongoose.Schema.Types.ObjectId;
  readonly seats: ISeatFullInfo[];
}
