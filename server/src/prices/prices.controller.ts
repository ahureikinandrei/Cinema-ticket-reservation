import { Body, Controller, Post } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PriceDto } from './dto/price.dto';

@Controller('prices')
export class PricesController {
  constructor(private priceService: PricesService) {}

  @Post('/create')
  addPrice(@Body() dto: PriceDto) {
    return this.priceService.addPrice(dto);
  }
}
