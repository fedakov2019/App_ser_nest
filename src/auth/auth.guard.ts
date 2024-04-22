import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { CookieService } from './cookie.service';
import { ROLES_KEY } from './roles-auth.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest() as Request;
    const tokenaccess = req.headers.authorization?.split(' ')[1];
    const tokenref = req.cookies[CookieService.tokenKey];
    if (!tokenaccess) {
      throw new UnauthorizedException();
    }
    if (!tokenref) {
      throw new UnauthorizedException();
    }
    let sessionInfor, sessionInfo;
    try {
      sessionInfor = this.jwtService.verifyAsync(tokenref, {
        secret: process.env.JWT_SECRET_R,
      });
    } catch {
      throw new UnauthorizedException();
    }

    try {
      sessionInfo = this.jwtService.verifyAsync(tokenaccess, {
        secret: process.env.JWT_SECRET_A,
      });

      if (sessionInfor.id !== sessionInfo.id) {
        throw new UnauthorizedException();
      }

      req['session'] = sessionInfo;
      return requiredRoles.includes(sessionInfo.valueRole);
    } catch {
      throw new UnauthorizedException('Нет доступа');
    }
  }
}
