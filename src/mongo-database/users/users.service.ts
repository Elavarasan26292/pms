import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseCrudService } from '../mongoose-crud.service';
import { UsersDocument } from './users.schema';

@Injectable()
export class UsersDbService extends MongooseCrudService<UsersDocument> {
  constructor(@InjectModel('users') private usersModel: Model<UsersDocument>) {
    super(usersModel);
  }
}
