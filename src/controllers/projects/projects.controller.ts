import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  NotFoundException,
  InternalServerErrorException,
  Param,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationGuard } from 'src/guards/validation.guard';
import {
  projectInputType,
  projectsResponseType,
  updateProjectInputType,
} from 'src/models/projects.dto';
import { ProjectsService } from 'src/services/projects/projects.service';
import { UsersService } from 'src/services/users/users.service';
import { Types } from 'mongoose';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectService: ProjectsService,
  ) {}

  @Post()
  @UseGuards(new ValidationGuard(projectInputType))
  async create(
    @Body() projectInput: projectInputType,
  ): Promise<projectsResponseType> {
    try {
      if (projectInput.projectHead) {
        const isProjHeadExists = await this.usersService.findOne({
          _id: new Types.ObjectId(projectInput.projectHead),
        });
        if (!isProjHeadExists) {
          throw new NotFoundException(
            `Projecthead is not a valid application user`,
          );
        }
      }
      if (projectInput.manager) {
        const isManagerExists = await this.usersService.findOne({
          _id: new Types.ObjectId(projectInput.manager),
        });
        if (!isManagerExists) {
          throw new NotFoundException(
            `Manager is not a valid application user`,
          );
        }
      }

      return await this.projectService.createProject({
        ...projectInput,
        status: 'Created',
      });
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }
  }

  @Put('/:id')
  @UseGuards(new ValidationGuard(updateProjectInputType))
  async update(
    @Param('id') id: unknown,
    @Body() projectInput: updateProjectInputType,
  ): Promise<projectsResponseType> {
    try {
      if (projectInput.projectHead) {
        const isProjHeadExists = await this.usersService.findOne({
          _id: new Types.ObjectId(projectInput.projectHead),
        });
        if (!isProjHeadExists) {
          throw new NotFoundException(
            `Projecthead is not a valid application user`,
          );
        }
      }
      if (projectInput.manager) {
        const isManagerExists = await this.usersService.findOne({
          _id: new Types.ObjectId(projectInput.manager),
        });
        if (!isManagerExists) {
          throw new NotFoundException(
            `Manager is not a valid application user`,
          );
        }
      }

      return await this.projectService.updateWithCondition(
        { _id: new Types.ObjectId(id.toString()) },
        projectInput,
      );
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }
  }

  @Get()
  async find(): Promise<projectsResponseType[]> {
    try {
      return await this.projectService.findAll();
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: unknown): Promise<projectsResponseType> {
    try {
      return await this.projectService.findOne({
        _id: id,
      });
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }
  }

  @Get('/:id/tasks')
  async findTasks(@Param('id') id: unknown): Promise<projectsResponseType[]> {
    try {
      return await this.projectService.getProjectAndTasks(
        new Types.ObjectId(id.toString()),
      );
    } catch (err) {
      throw new InternalServerErrorException(err.toString());
    }
  }
}
