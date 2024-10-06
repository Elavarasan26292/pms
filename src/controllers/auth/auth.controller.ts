import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { loginInputType, loginResponseType } from '../../models/auth.dto';
import { ValidationGuard } from 'src/guards/validation.guard';
import { AuthService } from 'src/services/auth/auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(new ValidationGuard(loginInputType))
  async create(@Body() input: loginInputType): Promise<loginResponseType> {
    const user = await this.authService.validateUser(
      input.email,
      input.password,
    );
    const tokenResult = await this.authService.login(user);
    return {
      message: 'User Loggedin Successfully',
      userId: user._id,
      token: tokenResult.access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
