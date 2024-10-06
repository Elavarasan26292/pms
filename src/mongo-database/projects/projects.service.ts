import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseCrudService } from '../mongoose-crud.service';
import { ProjectsDocument } from './projects.schema';

@Injectable()
export class ProjectsDbService extends MongooseCrudService<ProjectsDocument> {
  constructor(
    @InjectModel('projects') private projectsModel: Model<ProjectsDocument>,
  ) {
    super(projectsModel);
  }
}
