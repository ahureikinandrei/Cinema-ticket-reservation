import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './schemas/film.schema';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Film.name,
        schema: FilmSchema,
      },
    ]),
    AuthModule,
    FilesModule,
    SessionsModule,
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
