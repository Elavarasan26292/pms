import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsOptional,
  IsArray,
} from 'class-validator';

export class usersInputType {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  status: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tasks: string[];
}

export class updateUsersInputType {
  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tasks: string[];
}

export class usersResponseType {
  message?: string;
  _id?: unknown;
  userName?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: string;
  tasks?: string[];
}
