import { JwtService } from '@nestjs/jwt';
import { CookieService } from './cookie.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
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
import {
  GetSessionInfoDto,
  SignUpBodyDto,
  SignInBodyDto,
  signinResp,
  signdeluser,
  iduserdto,
} from './dtoauth';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { Hesch_ref } from './hesch-ref.decorator';
import { SessionInfo } from './session-info.decorator';
import { Roles } from './roles-auth.decorator';
import { AuthGuards } from './autthjwt.guard';
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
  @ApiOperation({ summary: 'Проверка логин и пароля' })
  @ApiOkResponse({ type: signinResp })
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
  @ApiOperation({ summary: 'Выход' })
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
  @ApiOperation({ summary: 'Обнавление токенов' })
  @ApiOkResponse({ type: signinResp })
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
  @ApiOperation({ summary: 'Вход по токену' })
  @ApiOkResponse({ type: GetSessionInfoDto })
  @UseGuards(AuthGuards)
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
  @Delete('/deletUser/:id')
  @Roles('ADMIN')
  @ApiOkResponse({ type: signdeluser })
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удаление пользователя' })
  async delDeleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.autchService.deletUser(id);
    let resultCode: number;
    if (user) {
      resultCode = 0;
      return resultCode;
    }
    {
      throw new HttpException('Пользователь не найдена', HttpStatus.NOT_FOUND);
    }
  }
  @Get('/user/:id')
  @ApiOkResponse({ type: iduserdto })
  @ApiOperation({ summary: 'Поиск пользователя по Id' })
  async getUserID(@Param('id', ParseIntPipe) id: number) {
    const user = await this.autchService.getUserID(id);
    if (user) {
      return { ...user };
    }
    {
      throw new HttpException('Пользователь не найдена', HttpStatus.NOT_FOUND);
    }
  }
  @Post('/register/:id')
  @ApiOkResponse({ type: iduserdto })
  @ApiOperation({ summary: 'Обновление данных пользователя по Id' })
  async postUpdate_registr(
    @Body() body: SignInBodyDto,
    @Res({ passthrough: true }) res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.autchService.updateUserid(id, body.login, body.password);
  }
}
