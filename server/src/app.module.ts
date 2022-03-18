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
import { SeatsGateway } from './seats.gateway';
import * as path from 'path';

@Module({
  controllers: [],
  providers: [SeatsGateway],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_DB_URI),
    UsersModule,
    OrdersModule,
    AuthModule,
    FilmsModule,
    CinemaModule,
    SessionsModule,
    HallModule,
    PricesModule,
  ],
})
export class AppModule {}
