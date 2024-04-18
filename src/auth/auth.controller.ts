import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetSessionInfoDto, SignUpBodyDto, SignInBodyDto } from './dtoauth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private autchService: AuthService) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  signUp(@Body() body: SignUpBodyDto) {
    return this.autchService.signUp(body.login, body.password, body.access);
  }
  @Post('sign-in')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body: SignInBodyDto) {}
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
