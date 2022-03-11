import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderCreateDto } from './dto/orderCreate.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/create')
  addOrder(@Body() dto: OrderCreateDto) {
    return this.ordersService.addOrder(dto);
  }
}
