import { SessionInfo } from './session-info.decorator';
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
import { GetSessionInfoDto } from './dtoauth';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
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
      
    } catch {
      throw new UnauthorizedException('Нет доступа');
    }

    return true;
  }
}
