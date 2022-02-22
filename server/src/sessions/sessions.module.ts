import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from '../films/schemas/film.schema';
import { Session, SessionSchema } from './schemas/session.schema';
import { Cinema, CinemaSchema } from '../cinema/schemas/cinema.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Session.name,
        schema: SessionSchema,
      },
      {
        name: Film.name,
        schema: FilmSchema,
      },
      {
        name: Cinema.name,
        schema: CinemaSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
