import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TasksDbService } from 'src/mongo-database/tasks/tasks.service';
import { taskInputType, taskResponseType } from 'src/models/task.dto';
import { projectStatus } from 'src/models/enums';
import { Types } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(private readonly tasksDbService: TasksDbService) {}

  async createTask(taskInput: taskInputType): Promise<taskResponseType> {
    return await this.tasksDbService.create(taskInput);
  }

  async findOne(condition: any): Promise<taskResponseType> {
    return await this.tasksDbService.findOne(condition);
  }

  async find(condition: any): Promise<taskResponseType[]> {
    return await this.tasksDbService.findAll(condition);
  }

  async update(condition: any, updateQuery: any): Promise<boolean> {
    await this.tasksDbService.updateOneWithConditions(condition, updateQuery);
    return true;
  }

  async updateTask(
    id: unknown,
    user: taskResponseType,
  ): Promise<taskResponseType> {
    const result = await this.tasksDbService.updateOneWithConditions(
      { _id: id },
      { $set: user },
    );
    return {
      message: 'Task Updated Successfully',
      _id: result._id,
    };
  }

  async validateTaskAvailablity(ids: string[]): Promise<boolean> {
    const Ids = ids.map((e) => new Types.ObjectId(e));
    const tasks = await this.tasksDbService.findAll({
      _id: { $in: Ids },
      status: projectStatus.CREATED,
    });
    if (tasks.length != Ids.length) {
      throw new ConflictException(
        `Conflict with the tasks assigned, please recheck the task id's and task status`,
      );
    }
    return true;
  }

  async delete(id: unknown): Promise<boolean> {
    await this.tasksDbService.delete(id);
    return true;
  }

  async exists(condition: any): Promise<boolean> {
    const task = await this.tasksDbService.exists(condition);
    return task ? true : false;
  }
}
