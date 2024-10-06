import { Injectable } from '@nestjs/common';
import {
  updateUsersInputType,
  usersInputType,
  usersResponseType,
} from 'src/models/users.dto';
import { UsersDbService } from 'src/mongo-database/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersDbService: UsersDbService) {}

  async createUser(user: usersInputType): Promise<usersResponseType> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userCreated = await this.usersDbService.create({
      ...user,
      password: hashedPassword,
    });
    return {
      message: 'User Created Successfully',
      _id: userCreated._id,
    };
  }

  async updateUser(
    id: unknown,
    user: updateUsersInputType,
  ): Promise<usersResponseType> {
    const result = await this.usersDbService.updateOneWithConditions(
      { _id: id },
      { $set: user },
    );
    return {
      message: 'User Updated Successfully',
      _id: result._id,
    };
  }

  async findOne(condition: any): Promise<usersResponseType> {
    return await this.usersDbService.findOne(condition);
  }

  async findAll(condition?: any): Promise<usersResponseType[]> {
    return await this.usersDbService.findAll(condition);
  }

  async exists(emailId: string): Promise<boolean> {
    const user = await this.usersDbService.exists({ email: emailId });
    return user ? true : false;
  }

  async updateTaskStatusInUsers(
    userId: unknown,
    taskId: string,
  ): Promise<boolean> {
    await this.usersDbService.update(
      {
        _id: userId,
      },
      {
        $push: { tasks: taskId },
      },
    );
    return true;
  }

  async removeTaskStatusInUsers(
    userId: unknown,
    taskId: string,
  ): Promise<boolean> {
    await this.usersDbService.update(
      {
        _id: userId,
      },
      {
        $pull: { tasks: taskId },
      },
    );
    return true;
  }
}
