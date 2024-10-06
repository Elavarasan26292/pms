import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ServicesModule } from 'src/services/services.module';
import { ProjectsController } from './projects/projects.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/controllers/auth/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [ServicesModule, AuthModule],
  controllers: [UsersController, ProjectsController, TasksController],
  providers: [],
})
export class ControllersModule {}
