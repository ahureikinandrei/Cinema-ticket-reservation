import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HallService } from './hall.service';
import { Role } from '../auth/roles-auth.decorator';
import { Roles } from '../users/types/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { HallDto } from './dto/hall.dto';

@Controller('hall')
export class HallController {
  constructor(private hallService: HallService) {}

  @Role(Roles.Admin)
  @UseGuards(RolesGuard)
  @Post('/create')
  addFilm(@Body() dto: HallDto) {
    return this.hallService.addHall(dto);
  }

  @Get()
  getAllHalls() {
    return this.hallService.getAllHalls();
  }
}
