import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UsePipes,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { DeleteUserDto } from './dto/delete-uset.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles-auth.decorator';
import { Roles } from './types/roles.enum';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ObjectId } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUser(@Param('id') id: ObjectId) {
    return this.usersService.getUser(id);
  }

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Role(Roles.Admin)
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Role(Roles.Admin)
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @Post('/delete')
  delete(@Body() dto: DeleteUserDto) {
    return this.usersService.deleteUser(dto);
  }
}
