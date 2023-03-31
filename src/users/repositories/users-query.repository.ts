import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users-schema';
import { Model } from 'mongoose';
import * as cluster from 'cluster';
import { UserViewDTO } from '../types';

@Injectable()
export class UsersQueryRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async getUser(id: string): Promise<UserViewDTO | null> {
    const user: UserDocument = await this.UserModel.findOne()
      .where('_id')
      .equals(id);
    if (!user) return null;
    return {
      id: user._id.toString(),
      login: user.login,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
