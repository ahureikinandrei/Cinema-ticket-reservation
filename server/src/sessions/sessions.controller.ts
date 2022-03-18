import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  HttpCode,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Role } from '../auth/roles-auth.decorator';
import { Roles } from '../users/types/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { SessionDto, updateSessionDto } from './dto/session.dto';
import { ObjectId } from 'mongoose';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Role(Roles.Admin)
  @UseGuards(RolesGuard)
  @Post('/create')
  addSession(@Body() dto: SessionDto) {
    return this.sessionsService.addSession(dto);
  }

  @Get('/:id')
  getSessionById(@Param('id') id: ObjectId) {
    return this.sessionsService.getSessionById(id);
  }

  @Post('/update/:id')
  @HttpCode(200)
  updateSessionById(@Param('id') id: ObjectId, @Body() dto: updateSessionDto) {
    const { selectedSeats } = dto;
    return this.sessionsService.updateSessionFreeSeats(id, selectedSeats);
  }

  @Get('/film/:id')
  getSessionByFilmId(@Param('id') id: ObjectId) {
    return this.sessionsService.getSessionByFilmId(id);
  }
}
