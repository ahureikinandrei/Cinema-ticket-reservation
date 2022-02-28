import { Injectable } from '@nestjs/common';
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

  getSessionById(id) {
    return this.sessionModel
      .findById(id)
      .populate('film')
      .populate('cinema')
      .populate('hall')
      .populate('price');
  }

  getSessionByFilmId(id: ObjectId) {
    return this.sessionModel.find({ film: id }).populate('cinema');
  }
}
