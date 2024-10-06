import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationGuard implements CanActivate {
  constructor(private readonly dto: any) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = plainToClass(this.dto, request.body);

    const errors = await validate(body);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return true;
  }
}
