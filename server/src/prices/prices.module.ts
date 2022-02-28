import { Module } from '@nestjs/common';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Price, PriceSchema } from './schemas/price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Price.name,
        schema: PriceSchema,
      },
    ]),
  ],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
