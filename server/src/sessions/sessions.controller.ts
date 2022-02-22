import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Role } from '../auth/roles-auth.decorator';
import { Roles } from '../users/types/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { SessionDto } from './dto/session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Role(Roles.Admin)
  @UseGuards(RolesGuard)
  @Post('/create')
  addSession(@Body() dto: SessionDto) {
    return this.sessionsService.addSession(dto);
  }
}
