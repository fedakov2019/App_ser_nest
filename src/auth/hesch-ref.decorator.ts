import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CookieService } from './cookie.service';

export const Hesch_ref = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const refToken = request.cookies[CookieService.tokenKey];

    return data ? refToken?.[data] : refToken;
  },
);
