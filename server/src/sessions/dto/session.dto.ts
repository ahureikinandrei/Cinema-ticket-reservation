import { ObjectId } from 'mongoose';

export class SessionDto {
  readonly date: string;
  readonly time: string;
  readonly film: ObjectId;
  readonly cinema: ObjectId;
}
