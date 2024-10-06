import {
  Controller,
  Post,
  Body,
  UseGuards,
  ConflictException,
  Put,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  updateUsersInputType,
  usersInputType,
  usersResponseType,
} from '../../models/users.dto';
import { UsersService } from 'src/services/users/users.service';
import { ValidationGuard } from 'src/guards/validation.guard';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from 'src/services/tasks/tasks.service';
import { Types } from 'mongoose';
import { projectStatus } from 'src/models/enums';
import { ProjectsService } from 'src/services/projects/projects.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  @UseGuards(new ValidationGuard(usersInputType))
  async create(@Body() userInput: usersInputType): Promise<usersResponseType> {
    try {
      const user = await this.usersService.exists(userInput.email);
      if (user) {
        throw new ConflictException(
          `User with emailId ${userInput.email} already exists`,
        );
      }

      if (userInput?.tasks?.length > 0) {
        await this.tasksService.validateTaskAvailablity(userInput.tasks);
      }
      const userCreated = await this.usersService.createUser({
        ...userInput,
        status: 'Active',
      });

      if (userInput?.tasks?.length > 0) {
        const Ids = userInput.tasks.map((e) => new Types.ObjectId(e));
        await this.tasksService.update(
          { _id: { $in: Ids } },
          { $set: { status: projectStatus.ONGOING } },
        );
      }
      return userCreated;
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(new ValidationGuard(updateUsersInputType))
  async update(
    @Param('id') id: unknown,
    @Body() userInput: updateUsersInputType,
  ): Promise<usersResponseType> {
    try {
      const user = await this.usersService.findOne({ _id: id });
      if (!user) {
        throw new ConflictException(`User not Exists`);
      }
      if (userInput?.tasks?.length > 0) {
        await this.tasksService.validateTaskAvailablity(userInput.tasks);
      }
      const result = await this.usersService.updateUser(id, userInput);
      if (userInput?.tasks?.length > 0) {
        const Ids = userInput.tasks.map((e) => {
          this.usersService.updateTaskStatusInUsers(id, e);
          return new Types.ObjectId(e);
        });
        await this.tasksService.update(
          { _id: { $in: Ids } },
          { $set: { status: projectStatus.ONGOING } },
        );
      }
      return result;
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }
  }
}
