import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}


  async create(createUserDto: any) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async findById(id: any): Promise<UserDocument>{
    return await this.userModel.findById(id).exec();
  }

  async findAllWithoutCurrentUser(userId: any) {
    const all = await this.userModel.find().exec();
    const filtered = all.filter((user) => user._id != userId);
    return filtered
  }



}
