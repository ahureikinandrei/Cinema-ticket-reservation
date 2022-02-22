import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cinema, CinemaDocument } from '../cinema/schemas/cinema.schema';
import { Model } from 'mongoose';
import { CinemaDto } from './dto/cinema.dto';

@Injectable()
export class CinemaService {
  constructor(
    @InjectModel(Cinema.name) private cinemaModel: Model<CinemaDocument>,
  ) {}

  async addCinema(dto: CinemaDto) {
    const cinema = await this.cinemaModel.create(dto);
    return cinema;
  }

  async getAll() {
    const cinemas = await this.cinemaModel.find().exec();
    return cinemas;
  }
}
