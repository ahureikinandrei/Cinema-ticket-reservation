import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationException } from '../exceptions/validation.exception';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class ValidationPipe implements PipeTransform<CreateUserDto> {
  async transform(
    value: CreateUserDto,
    metadata: ArgumentMetadata,
  ): Promise<CreateUserDto> {
    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      });
      throw new ValidationException(messages);
    }
    return value;
  }
}
