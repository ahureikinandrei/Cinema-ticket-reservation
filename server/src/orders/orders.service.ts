import { Injectable } from '@nestjs/common';
import { OrderCreateDto } from './dto/orderCreate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { PricesService } from '../prices/prices.service';
import { UsersService } from '../users/users.service';
import * as mongoose from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private pricesService: PricesService,
    private userService: UsersService,
  ) {}

  async addOrder(dto: OrderCreateDto, userId: mongoose.Schema.Types.ObjectId) {
    const { priceID, ...rest } = dto;
    await this.pricesService.updatePurchasedSeats(priceID, rest.seats);

    const order = await this.orderModel.create(rest);

    await this.userService.addOrder(userId, order);
    return order;
  }
}
