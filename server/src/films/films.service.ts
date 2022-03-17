import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilmDocument, Film } from './schemas/film.schema';
import { Model, ObjectId } from 'mongoose';
import { FilmDto } from './dto/film.dto';
import { FilesService } from '../files/files.service';
import { QueryParams } from './dto/queryParams.dto';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private filmModel: Model<FilmDocument>,
    private filesService: FilesService,
    private sessionService: SessionsService,
  ) {}

  async addFilm(dto: FilmDto, image) {
    const fileName = await this.filesService.createFile(image);
    return await this.filmModel.create({
      ...dto,
      img: fileName,
    });
  }

  async getById(id: ObjectId) {
    return await this.filmModel.findById(id).exec();
  }

  async getFilms(queryParams: QueryParams) {
    const {
      name,
      page = 1,
      limit,
      age,
      genre,
      rating,
      city,
      cinema,
    } = queryParams;
    const options = {};

    if (cinema || city) {
      const arrayFilmsID =
        await this.sessionService.getFilmsIDFromSessionByCity(city, cinema);
      Object.assign(options, { _id: { $in: arrayFilmsID } });
    }

    if (name) {
      Object.assign(options, { name: new RegExp(name, 'i') });
    }

    if (genre) {
      Object.assign(options, { genre: new RegExp(genre, 'i') });
    }

    if (rating > 0) {
      Object.assign(options, { rating: { $gte: rating } });
    }

    if (age > 0) {
      Object.assign(options, { age: { $gte: age } });
    }

    const total = await this.filmModel.count(options);

    const films = await this.filmModel
      .find(options)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      films,
      total,
    };
  }

  async getAllFilms() {
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
