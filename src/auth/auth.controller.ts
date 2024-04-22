import { JwtService } from '@nestjs/jwt';
import { CookieService } from './cookie.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetSessionInfoDto, SignUpBodyDto, SignInBodyDto } from './dtoauth';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { Hesch_ref } from './hesch-ref.decorator';
import { SessionInfo } from './session-info.decorator';
@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private autchService: AuthService,
    private cookieService: CookieService,
    private jwtService: JwtService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  @ApiOperation({ summary: 'Создание пользователя' })
  async signUp(
    @Body() body: SignUpBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refrechToken } = await this.autchService.signUp(
      body.login,
      body.password,
    );
    this.cookieService.setToken(res, refrechToken);
  }
  @Post('sign-in')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: SignInBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refrechToken, accesToken } = await this.autchService.signIn(
      body.login,
      body.password,
    );
    this.cookieService.setToken(res, refrechToken);
    return { accesToken };
  }

  @Post('sign-out')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async signOut(
    @Res({ passthrough: true }) res: Response,
    @Hesch_ref() tokenRef: string,
  ) {
    this.cookieService.removeToken(res);

    const newsu = await this.autchService.signOut(tokenRef);
    if (!newsu) {
      throw new BadRequestException({ type: 'Ошибка записи' });
    }
  }
  @Post('sign-refrech')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async refrech(
    @Hesch_ref() tokenRef: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refrechToken, accesToken } =
      await this.autchService.signrefrech(tokenRef);
    this.cookieService.setToken(res, refrechToken);
    return { accesToken };
  }

  @Get('session')
  @ApiOkResponse({ type: GetSessionInfoDto })
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
  @Delete('/deletUser/:id',delDeleteUser)
  @Get('/user/:id',getUserID)
  @Post('/register/:id',postUpdate_registr)


}
