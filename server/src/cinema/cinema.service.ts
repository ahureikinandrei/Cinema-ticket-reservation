import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cinema, CinemaDocument } from './schemas/cinema.schema';
import { Model } from 'mongoose';
import { CinemaDto } from './dto/cinema.dto';

@Injectable()
export class CinemaService {
  constructor(
    @InjectModel(Cinema.name) private cinemaModel: Model<CinemaDocument>,
  ) {}

  async addCinema(dto: CinemaDto) {
    return await this.cinemaModel.create(dto);
  }

  async getAll() {
    return await this.cinemaModel.find().exec();
  }
}
