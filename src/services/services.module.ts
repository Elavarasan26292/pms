import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { MongoSchemaModule } from 'src/mongo-database/mongo-schema.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ProjectsService } from './projects/projects.service';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [
    MongoSchemaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'PMS_API_SECRET',
      signOptions: { expiresIn: '900s' },
    }),
  ],
  providers: [AuthService, UsersService, ProjectsService, TasksService],
  exports: [AuthService, UsersService, ProjectsService, TasksService],
})
export class ServicesModule {}
