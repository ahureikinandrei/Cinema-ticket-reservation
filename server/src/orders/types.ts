import { Request } from 'express';
import { UserDocument } from '../users/schemas/user.schema';

export interface IReqWhitUser extends Request {
  user: UserDocument;
}
