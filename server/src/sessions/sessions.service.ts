import { Injectable } from '@nestjs/common';
import { SessionDto } from './dto/session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionDocument } from './schemas/session.schema';
import { Model } from 'mongoose';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async addSession(dto: SessionDto) {
    const session = await this.sessionModel.create(dto);
    return session;
  }
}
