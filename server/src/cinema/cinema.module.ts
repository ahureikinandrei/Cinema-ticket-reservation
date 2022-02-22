import { Module } from '@nestjs/common';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cinema, CinemaSchema } from '../cinema/schemas/cinema.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cinema.name,
        schema: CinemaSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}
