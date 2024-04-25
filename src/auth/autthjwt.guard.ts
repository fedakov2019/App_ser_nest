import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { CookieService } from './cookie.service';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    const tokenaccess = req.headers.authorization?.split(' ')[1];
    const tokenref = req.cookies[CookieService.tokenKey];
    if (!tokenaccess) {
      throw new UnauthorizedException();
    }
    if (!tokenref) {
      throw new UnauthorizedException('Нет доступа');
    }
    let sessionInfor, sessionInfo;
    try {
      sessionInfor = await this.jwtService.verifyAsync(tokenref, {
        secret: process.env.JWT_SECRET_R,
      });
    } catch {
      throw new UnauthorizedException('Нет доступа');
    }

    try {
      sessionInfo = await this.jwtService.verifyAsync(tokenaccess, {
        secret: process.env.JWT_SECRET_A,
      });
    } catch {
      throw new UnauthorizedException('Нет доступа');
    }

    if (sessionInfor.id !== sessionInfo.id) {
      throw new UnauthorizedException('Нет доступа');
    }

    req['session'] = sessionInfo;

    return true;
  }
}
