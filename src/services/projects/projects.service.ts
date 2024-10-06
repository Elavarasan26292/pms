import { Injectable } from '@nestjs/common';
import { ProjectsDbService } from 'src/mongo-database/projects/projects.service';
import {
  projectInputType,
  projectsResponseType,
} from 'src/models/projects.dto';
import { Types } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectDbService: ProjectsDbService) {}

  async createProject(
    projectInput: projectInputType,
  ): Promise<projectsResponseType> {
    const project = await this.projectDbService.create(projectInput);
    return {
      message: 'Project Created Successfully',
      _id: project._id,
    };
  }

  async findAll(condition?: any): Promise<projectsResponseType[]> {
    return await this.projectDbService.findAll(condition);
  }

  async findOne(condition: any): Promise<projectsResponseType> {
    return await this.projectDbService.findOne(condition);
  }

  async update(condition: any, updateQuery: any): Promise<boolean> {
    await this.projectDbService.updateOneWithConditions(condition, updateQuery);
    return true;
  }

  async updateWithCondition(
    condition: any,
    updateQuery: any,
  ): Promise<projectsResponseType> {
    const project = await this.projectDbService.updateOneWithConditions(
      condition,
      updateQuery,
    );
    return {
      message: 'Project Updated Successfully',
      _id: project._id,
    };
  }

  async updateTaskStatusInProjects(
    projectId: unknown,
    taskId: string,
  ): Promise<boolean> {
    await this.projectDbService.update(
      {
        _id: projectId,
      },
      {
        $push: { tasks: taskId },
      },
    );
    return true;
  }

  async removeTaskStatusInProjects(
    projectId: unknown,
    taskId: string,
  ): Promise<boolean> {
    await this.projectDbService.update(
      {
        _id: projectId,
      },
      {
        $pull: { tasks: taskId },
      },
    );
    return true;
  }

  async getProjectWithTasks(condition: any): Promise<any> {
    return await this.projectDbService.findOne(condition);
  }

  async getProjectAndTasks(
    projectId: unknown,
  ): Promise<projectsResponseType[]> {
    const project = await this.projectDbService.findOne({ _id: projectId });
    const taskIds = project.tasks.map((e) => new Types.ObjectId(e));
    return await this.projectDbService.aggregate([
      {
        $match: { _id: projectId },
      },
      {
        $addFields: {
          taskObjectsIds: taskIds,
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'taskObjectsIds',
          foreignField: '_id',
          as: 'taskDetails',
        },
      },
    ]);
  }
}
