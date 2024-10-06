import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersDbService } from './users/users.service';
import { modelProviders } from './models';
import { ProjectsDbService } from './projects/projects.service';
import { TasksDbService } from './tasks/tasks.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('URI') +
          configService.get<string>('DBNAME'),
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
