import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class projectInputType {
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  projectHead: string;

  @IsString()
  @IsOptional()
  manager: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  task: string;
}

export class updateProjectInputType {
  @IsString()
  @IsOptional()
  projectName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  projectHead: string;

  @IsString()
  @IsOptional()
  manager: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  task: string;
}

export class projectsResponseType {
  message?: string;
  _id?: unknown;
  projectName?: string;
  description?: string;
  projectHead?: string;
  manager?: string;
  status?: string;
  tasks?: string[];
  taskDetails?: any[];
}
