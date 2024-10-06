import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
  IsDate,
  Matches,
} from 'class-validator';
import { userStatus } from './enums';

export class taskInputType {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  taskName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  priority: number;

  @IsDateString()
  @IsNotEmpty()
  deadLine: Date;

  @IsString()
  @IsOptional()
  status: string;
}

export class updateTaskInputType {
  @IsString()
  @IsNotEmpty()
  taskName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  priority: number;

  @IsDateString()
  @IsNotEmpty()
  deadLine: Date;
  // 2024-10-03T00:00:00Z

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  projectId: string;

  @IsString()
  @IsOptional()
  userId: string;
}

export class UserStatusDto {
  @IsOptional()
  @IsEnum(userStatus)
  status?: userStatus; // Validate that 'role' is one of the enum values
}

export class taskResponseType {
  message?: string;
  _id?: unknown;
  projectId?: string;
  userId?: string;
  taskName?: string;
  description?: string;
  priority?: number;
  status?: string;
  deadLine?: Date;
}
