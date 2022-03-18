import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { DeleteUserDto } from './dto/delete-uset.dto';
import * as mongoose from 'mongoose';
import { Order } from '../orders/schemas/order.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(dto: CreateUserDto) {
    const newUser = new this.userModel(dto);
    return await newUser.save();
  }

  async getAllUsers() {
    return await this.userModel.find().exec();
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async getUser(id: mongoose.Schema.Types.ObjectId) {
    return this.userModel.findById(id).populate({
      path: 'orders',
      populate: {
        path: 'session',
        populate: [
          {
            path: 'cinema',
          },
          {
            path: 'film',
          },
        ],
      },
    });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findById(dto.userId);
    const role = dto.value;
    if (role && user) {
      user.role = role;
      await user.save();
      return dto;
    }
    throw new HttpException(
      'User or role has not been found',
      HttpStatus.NOT_FOUND,
    );
  }

  async deleteUser(dto: DeleteUserDto) {
    const user = await this.userModel.findById(dto.userId);
    if (!user) {
      throw new HttpException(
        'Such user has not been found',
        HttpStatus.NOT_FOUND,
      );
    }

    return user.remove();
  }

  async addOrder(userID: mongoose.Schema.Types.ObjectId, order: Order) {
    const user = await this.userModel.findById(userID);
    user.orders.push(order);
    await user.save();

    return user;
  }

  async clearOrder(userID: mongoose.Schema.Types.ObjectId) {
    const user = await this.userModel.findById(userID);
    user.orders = [];
    await user.save();

    return user;
  }
}
