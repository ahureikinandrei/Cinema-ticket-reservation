import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { Role } from '../auth/roles-auth.decorator';
import { Roles } from '../users/types/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { CinemaService } from './cinema.service';
import { CinemaDto } from './dto/cinema.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private cinemaService: CinemaService) {}

  @Role(Roles.Admin)
  @UseGuards(RolesGuard)
  @Post('/create')
  addCinema(@Body() dto: CinemaDto) {
    return this.cinemaService.addCinema(dto);
  }

  @Get()
  getAll() {
    return this.cinemaService.getAll();
  }
}
