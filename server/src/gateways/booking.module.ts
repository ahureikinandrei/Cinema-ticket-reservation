import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookedSeat, BookedSeatSchema } from './schemas/booking.schema';
import { BookingGateway } from './booking.gateway';

@Module({
  providers: [BookingService, BookingGateway],
  imports: [
    MongooseModule.forFeature([
      {
        name: BookedSeat.name,
        schema: BookedSeatSchema,
      },
    ]),
  ],
})
export class BookingModule {}
