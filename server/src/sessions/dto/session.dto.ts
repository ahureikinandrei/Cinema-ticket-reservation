import { ObjectId } from 'mongoose';

export class SessionDto {
  readonly date: string;
  readonly time: string;
  readonly freeSeats: number;
  readonly film: ObjectId;
  readonly cinema: ObjectId;
  readonly hall: ObjectId;
}

export class updateSessionDto {
  readonly selectedSeats: number;
}
