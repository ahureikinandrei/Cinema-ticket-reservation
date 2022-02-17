import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { Role } from '../auth/roles-auth.decorator';
import { Roles } from '../users/types/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { FilmsService } from './films.service';
import { FilmDto } from './dto/film.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Role(Roles.Admin)
  @UseGuards(RolesGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('img'))
  addFilm(@UploadedFile() file, @Body() dto: FilmDto) {
    return this.filmsService.addFilm(dto, file);
  }

  @Get()
  getFilms() {
    return this.filmsService.getFilms();
  }

  @Get(':id')
  getFilm(@Param('id') id: ObjectId) {
    return this.filmsService.getById(id);
  }
}
