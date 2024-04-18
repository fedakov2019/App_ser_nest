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

@Controller('auth')
export class AuthController {
  @Post('sign-up')
  @ApiCreatedResponse()
  signUp(@Body() body: SignUpBodyDto) {
    return null;
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
