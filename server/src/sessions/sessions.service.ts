import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SessionDto } from './dto/session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionDocument } from './schemas/session.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  addSession(dto: SessionDto) {
    return this.sessionModel.create(dto);
  }

  async getSessionById(id) {
    const session = await this.sessionModel
      .findById(id)
      .populate('film')
      .populate('cinema')
      .populate('price');

    if (!session) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }

    return session;
  }

  getSessionByFilmId(id: ObjectId) {
    return this.sessionModel.find({ film: id }).populate('cinema');
  }

  async getFilmsIDFromSession(
    city = '',
    cinema = '',
    date = '',
    freeSeats = 0,
  ) {
    const result = [];
    const sessions = await this.sessionModel
      .find({
        date: new RegExp(date, 'i'),
        freeSeats: { $gte: freeSeats },
      })
      .populate({
        path: 'cinema',
        match: {
          city: new RegExp(city, 'i'),
          name: new RegExp(cinema, 'i'),
        },
      });

    sessions.forEach(({ cinema, film }) => {
      if (cinema !== null) {
        result.push(film);
      }
      return cinema !== null;
    });

    return result;
  }

  updateSessionFreeSeats(id: ObjectId, selectedSeats: number) {
    return this.sessionModel
      .findByIdAndUpdate(id, {
        $inc: {
          freeSeats: -selectedSeats,
        },
      })
      .populate('film')
      .populate('cinema')
      .populate('price');
  }
}
