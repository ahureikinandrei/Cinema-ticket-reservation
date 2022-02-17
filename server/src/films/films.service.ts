import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilmDocument, Film } from './schemas/film.schema';
import { Model, ObjectId } from 'mongoose';
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

  async getById(id: ObjectId) {
    return await this.filmModel.findById(id).exec();
  }

  async getFilms() {
    const films = await this.filmModel.find().exec();

    const filmsWithImg = films.map(async (film) => {
      const imgBuffer = await this.filesService.returnFile(film.img);
      const { _id, name, rating, endDate, startDate, age, description, genre } =
        film;
      const img = imgBuffer.toString('base64');

      return {
        _id,
        name,
        rating,
        endDate,
        startDate,
        age,
        img,
        description,
        genre,
      };
    });

    return await Promise.all(filmsWithImg);
  }
}
