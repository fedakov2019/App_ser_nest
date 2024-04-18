import { CookieService } from './cookie.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetSessionInfoDto, SignUpBodyDto, SignInBodyDto } from './dtoauth';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private autchService: AuthService,
    private cookieService:CookieService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  async signUp(@Body() body: SignUpBodyDto,@Res({passthrough:true}) res:Response) {
  const {refrechToken}= await this.autchService.signUp(body.login, body.password, body.access);
  this.cookieService.setToken(res,refrechToken)
  }
  @Post('sign-in')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInBodyDto,@Res({passthrough:true}) res:Response) {
    const {refrechToken}= await this.autchService.signIn(body.login, body.password);
  this.cookieService.setToken(res,refrechToken)
  }
  @ApiOkResponse()
  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  signOut() {}
  @Get('session')
  @ApiOkResponse({ type: GetSessionInfoDto })
  getSessionInfo() {
    return null;
  }
}
