import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { DeleteUserDto } from './dto/delete-uset.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles-auth.decorator';
import { Roles } from './types/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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

  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @Post('/delete')
  delete(@Body() dto: DeleteUserDto) {
    return this.usersService.deleteUser(dto);
  }
}
