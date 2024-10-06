import { FactoryProvider, Inject } from '@nestjs/common';
import { UsersDocument, usersSchema } from './users/users.schema';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Schema, Connection, Model, Document } from 'mongoose';
import { ProjectsDocument, projectsSchema } from './projects/projects.schema';
import { TasksDocument, tasksSchema } from './tasks/tasks.schema';

export function createModelProvider<T extends Document>(
  name: string,
  schema: Schema<any>,
): FactoryProvider {
  return {
    provide: getModelToken(name),
    useFactory: (connection: Connection): Model<T> => {
      return connection.model<T>(name, schema);
    },
    inject: [getConnectionToken('admin')],
  };
}

const usersModelProvider = createModelProvider<UsersDocument>(
  'users',
  usersSchema,
);

const projectsModelProvider = createModelProvider<ProjectsDocument>(
  'projects',
  projectsSchema,
);

const tasksModelProvider = createModelProvider<TasksDocument>(
  'tasks',
  tasksSchema,
);

export const modelProviders = [
  usersModelProvider,
  projectsModelProvider,
  tasksModelProvider,
];
