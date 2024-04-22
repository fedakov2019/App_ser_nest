import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { CookieService } from './cookie.service';

import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_R,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, CookieService],
})
export class AuthModule {}
