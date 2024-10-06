import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseCrudService } from '../mongoose-crud.service';
import { TasksDocument } from './tasks.schema';

@Injectable()
export class TasksDbService extends MongooseCrudService<TasksDocument> {
  constructor(@InjectModel('tasks') private tasksModel: Model<TasksDocument>) {
    super(tasksModel);
  }
}
