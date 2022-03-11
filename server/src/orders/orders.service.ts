import { Injectable } from '@nestjs/common';
import { OrderCreateDto } from './dto/orderCreate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { PricesService } from '../prices/prices.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private pricesService: PricesService,
  ) {}

  async addOrder(dto: OrderCreateDto) {
    const { priceID, ...rest } = dto;
    await this.pricesService.updatePurchasedSeats(priceID, rest.seats);
    return await this.orderModel.create(rest);
  }
}
