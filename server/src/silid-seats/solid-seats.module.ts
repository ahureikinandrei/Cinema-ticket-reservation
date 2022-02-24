import { Module } from '@nestjs/common';
import { SolidSeatsController } from './solid-seats.controller';
import { SolidSeatsService } from './solid-seats.service';

@Module({
  controllers: [SolidSeatsController],
  providers: [SolidSeatsService],
})
export class SolidSeatsModule {}
