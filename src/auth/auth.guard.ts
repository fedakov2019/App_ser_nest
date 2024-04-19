import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CookieService } from './cookie.service';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    const tokenrefrech = req.cookies[CookieService.tokenKey];
    const tokenaccess = req.headers.authorization?.split(' ')[1];

    return true;
  }
}
