import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { FilmsModule } from './films/films.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CinemaModule } from './cinema/cinema.module';
import { SessionsModule } from './sessions/sessions.module';
import { HallModule } from './hall/hall.module';
import { PricesModule } from './prices/prices.module';
import { BookingModule } from './gateways/booking.module';
import { ScheduleModule } from '@nestjs/schedule';
import * as path from 'path';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_DB_URI),
    ScheduleModule.forRoot(),
    UsersModule,
    OrdersModule,
    AuthModule,
    FilmsModule,
    CinemaModule,
    SessionsModule,
    HallModule,
    PricesModule,
    BookingModule,
  ],
})
export class AppModule {}
