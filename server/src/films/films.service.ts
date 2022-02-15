import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilmDocument, Film } from './schemas/film.schema';
import { Model } from 'mongoose';
import { FilmDto } from './dto/film.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<FilmDocument>,
    private filesService: FilesService,
  ) {}

  async addFilm(dto: FilmDto, image) {
    const fileName = await this.filesService.createFile(image);
    const film = await this.filmModel.create({
      ...dto,
      img: fileName,
    });

    return film;
  }
}
