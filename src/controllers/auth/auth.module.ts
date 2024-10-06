import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ServicesModule } from 'src/services/services.module';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
  imports: [
    ServicesModule,
    JwtModule.register({
      secret: 'PMA_API_SECRET', // Replace with your secret key
      signOptions: { expiresIn: '900s' }, // Token expiration
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard], // Export if you want to use it in other modules
})
export class AuthModule {}
