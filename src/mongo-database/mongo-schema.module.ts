import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersDbService } from './users/users.service';
import { modelProviders } from './models';
import { ProjectsDbService } from './projects/projects.service';
import { TasksDbService } from './tasks/tasks.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('mongodb.uri') +
          configService.get<string>('mongodb.dbName'), // Access the MongoDB URI from .env
      }),
      // async () => ({
      //   uri: 'mongodb://localhost:27017',
      //   dbName: 'pmsdb',
      // }),
      connectionName: 'admin',
    }),
  ],
  providers: [
    ...modelProviders,
    UsersDbService,
    ProjectsDbService,
    TasksDbService,
  ],
  exports: [
    ...modelProviders,
    UsersDbService,
    ProjectsDbService,
    TasksDbService,
  ],
})
export class MongoSchemaModule {}
