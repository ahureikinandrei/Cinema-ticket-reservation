import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Field must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;
  @IsString({ message: 'Field must be a string' })
  @Length(4, 16, {
    message: 'Password must be at least 4 characters and less than 16',
  })
  readonly password: string;
}
