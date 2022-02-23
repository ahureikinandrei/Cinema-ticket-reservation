import { Body, Controller, Post, Get, UseGuards, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Role } from '../auth/roles-auth.decorator';
import { Roles } from '../users/types/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { SessionDto } from './dto/session.dto';
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

  @Get('/film/:id')
  getSessionByFilmId(@Param('id') id: ObjectId) {
    return this.sessionsService.getSessionByFilmId(id);
  }
}
