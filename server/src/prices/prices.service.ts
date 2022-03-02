import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Price, PriceDocument } from './schemas/price.schema';
import { Model } from 'mongoose';
import { PriceDto } from './dto/price.dto';

@Injectable()
export class PricesService {
  constructor(
    @InjectModel(Price.name) private priceModel: Model<PriceDocument>,
  ) {}

  async addPrice(dto: PriceDto) {
    return await this.priceModel.create(dto);
  }
}
