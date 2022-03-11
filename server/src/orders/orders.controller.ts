import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { OrderCreateDto } from './dto/orderCreate.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IReqWhitUser } from './types';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  addOrder(@Body() dto: OrderCreateDto, @Req() req: IReqWhitUser) {
    const { id } = req.user;
    return this.ordersService.addOrder(dto, id);
  }
}
