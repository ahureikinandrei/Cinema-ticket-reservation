import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class QueryParams {
  @IsInt()
  @Type(() => Number)
  page: number;

  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsInt()
  @Type(() => Number)
  rating: number;

  @IsInt()
  @Type(() => Number)
  freeSeats: number;

  @IsInt()
  @Type(() => Number)
  age: number;

  @IsString()
  city: string;

  @IsString()
  name: string;

  @IsString()
  cinema: string;

  @IsString()
  genre: string;

  @IsString()
  date: string;
}
