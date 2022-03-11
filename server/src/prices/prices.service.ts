import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Price, PriceDocument } from './schemas/price.schema';
import { Model } from 'mongoose';
import { PriceDto } from './dto/price.dto';
import mongoose from 'mongoose';
import { ISeatFullInfo } from '../orders/dto/orderCreate.dto';

@Injectable()
export class PricesService {
  constructor(
    @InjectModel(Price.name) private priceModel: Model<PriceDocument>,
  ) {}

  addPrice(dto: PriceDto) {
    return this.priceModel.create(dto);
  }

  async updatePurchasedSeats(
    priseID: mongoose.Schema.Types.ObjectId,
    seatsFullInfo: ISeatFullInfo[],
  ) {
    const price = await this.priceModel.findById(priseID);
    let isSomeOneBuyFirst = false;

    seatsFullInfo.forEach(({ row, seat }) => {
      const seatRow = price.seatsStatus[row - 1];
      const seatInfo = seatRow[seat - 1];
      isSomeOneBuyFirst = seatInfo.isBought;
      seatInfo.isBought = true;
    });

    if (isSomeOneBuyFirst) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return await price.save();
  }
}
