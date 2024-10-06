import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  NotFoundException,
  InternalServerErrorException,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationGuard } from 'src/guards/validation.guard';
import { Types } from 'mongoose';
import { TasksService } from 'src/services/tasks/tasks.service';
import {
  taskInputType,
  taskResponseType,
  updateTaskInputType,
} from 'src/models/task.dto';
import { ProjectsService } from 'src/services/projects/projects.service';
import { UsersService } from 'src/services/users/users.service';
import { taskStatus, userStatus } from 'src/models/enums';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly projectsService: ProjectsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  @UseGuards(new ValidationGuard(taskInputType))
  async create(@Body() taskInput: taskInputType): Promise<taskResponseType> {
    try {
      const project = await this.projectsService.findOne({
        _id: new Types.ObjectId(taskInput.projectId),
      });
      if (!project) {
        throw new NotFoundException(`No project with ${taskInput.projectId}`);
      }

      const user = await this.userService.findOne({
        _id: new Types.ObjectId(taskInput.userId),
      });
      if (!user) {
        throw new NotFoundException(`No User with ${taskInput.userId}`);
      }

      const task = await this.tasksService.createTask({
        ...taskInput,
        status: taskStatus.INPROGRESS,
      });
      await this.projectsService.updateTaskStatusInProjects(
        new Types.ObjectId(task.projectId),
        task._id.toString(),
      );
      return {
        message: 'Task Created Successfully',
        _id: task._id,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }
  }

  @Put('/:id')
  @UseGuards(new ValidationGuard(updateTaskInputType))
  async update(
    @Param('id') id: unknown,
    @Body() taskInput: updateTaskInputType,
  ): Promise<taskResponseType> {
    try {
      if (taskInput.projectId) {
        const project = await this.projectsService.findOne({
          _id: new Types.ObjectId(taskInput.projectId),
        });
        if (!project) {
          throw new NotFoundException(`No project with ${taskInput.projectId}`);
        }
      }
      if (taskInput.userId) {
        const user = await this.userService.findOne({
          _id: new Types.ObjectId(taskInput.userId),
        });
        if (!user) {
          throw new NotFoundException(`No User with ${taskInput.userId}`);
        }
      }

      if (taskInput.projectId) {
        const task = await this.tasksService.findOne({ _id: id });
        const updateResult = await this.tasksService.updateTask(
          { _id: id },
          taskInput,
        );
        await this.projectsService.removeTaskStatusInProjects(
          task.projectId,
          id.toString(),
        );
        await this.projectsService.updateTaskStatusInProjects(
          taskInput.projectId,
          id.toString(),
        );
        return updateResult;
      } else {
        return await this.tasksService.updateTask({ _id: id }, taskInput);
      }
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }
  }

  @Get()
  async get(
    @Query('projectName') projectName: string,
    @Query('userName') userName: string,
    @Query('status') status?: string,
  ): Promise<taskResponseType[]> {
    if (
      status &&
      status.toLowerCase() !== userStatus.ACTIVE.toLowerCase() &&
      status.toLowerCase() !== userStatus.INACTIVE.toLowerCase()
    ) {
      throw new NotFoundException(
        `Status input should contain only Active or Inactive`,
      );
    }
    let projectIds, userIds;
    const query = { $and: [] };
    if (projectName) {
      const regex = new RegExp(projectName, 'i');
      const projects = await this.projectsService.findAll({
        projectName: { $regex: regex },
      });
      projectIds = projects.map((e) => e._id);
    }
    if (userName) {
      const regex = new RegExp(userName, 'i');
      const users = await this.userService.findAll({
        userName: { $regex: regex },
      });
      userIds = users.map((e) => e._id);
    }
    if (projectIds?.length > 0) {
      query.$and.push({ projectId: { $in: projectIds } });
    }

    if (userIds?.length > 0) {
      query.$and.push({ userId: { $in: userIds } });
    }
    return await this.tasksService.find(query);
  }

  @Delete('/:id')
  @UseGuards(new ValidationGuard(updateTaskInputType))
  async Delete(@Param('id') id: unknown): Promise<taskResponseType> {
    try {
      const task = await this.tasksService.exists({
        _id: new Types.ObjectId(id.toString()),
      });
      if (!task) {
        throw new NotFoundException(`No task with taskid ${id}`);
      }
      await this.tasksService.delete(id);
      return {
        message: 'Task deleted successfully',
      };
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }
  }
}
