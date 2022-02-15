import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from '../auth/roles-auth.decorator';
import { Roles } from '../users/types/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { FilmsService } from './films.service';
import { FilmDto } from './dto/film.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../files/files.service';

@Controller('films')
export class FilmsController {
  constructor(
    private filmsService: FilmsService,
    private fileService: FilesService,
  ) {}

  @Role(Roles.Admin)
  @UseGuards(RolesGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('img'))
  addRole(@UploadedFile() file, @Body() dto: FilmDto) {
    return this.filmsService.addFilm(dto, file);
  }
}
