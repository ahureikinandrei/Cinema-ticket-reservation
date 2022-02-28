import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hall, HallDocument } from './schemas/hall.schema';
import { Model } from 'mongoose';
import { HallDto } from './dto/hall.dto';

@Injectable()
export class HallService {
  constructor(@InjectModel(Hall.name) private hallModel: Model<HallDocument>) {}

  async addHall(dto: HallDto) {
    const { name } = dto;
    if (!dto.schema.length) {
      throw new HttpException(
        'Need create hall greed data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const hall = await this.hallModel.findOne({ name }).exec();

    if (hall) {
      throw new HttpException(
        'Hall with such name already exists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.hallModel.create(dto);
  }

  getAllHalls() {
    return this.hallModel.find().exec();
  }
}
