import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersDbService } from 'src/mongo-database/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { usersResponseType } from 'src/models/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersDbService: UsersDbService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(emailId: string, password: string): Promise<any> {
    const user = await this.usersDbService.findOne({ email: emailId });
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: usersResponseType) {
    const payload = { username: user.email, sub: user._id }; // Customize as needed
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
