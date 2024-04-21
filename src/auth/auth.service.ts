import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { GetSessionInfoDto } from './dtoauth';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    private roleservice:RolesService,
  ) {}
  async signUp(login: string, password: string) {
    const user = await this.userService.findByName(login);
    if (user) {
      throw new BadRequestException({ type: 'login - уже существует' });
    }
    const salt = this.passwordService.getSalt();
    const hach = this.passwordService.getHash(password, salt);
    const role = await this.roleservice.getRoleByValue("USER");
    
    if (role) {
  
    const newUser = await this.userService.create(login, hach, salt, role.id);
    const refrechToken = await this.jwtService.signAsync({
      id: newUser.id,
      login: newUser.login,
      rolesId: newUser.rolesId,
    });

    const newsu = await this.userService.update(newUser.id, refrechToken);
    if (!newsu) {
      throw new BadRequestException({ type: 'Ошибка записи' });
    }
    return { refrechToken };}{
      throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND);
    }
  }
  async signrefrech(token: string) {
    const user = await this.userService.findByToken(token);
    if (!user) {
      throw new UnauthorizedException({ type: 'не авторизован' });
    }
    const usern: GetSessionInfoDto = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_R,
    });
    if (!usern) {
      throw new UnauthorizedException({ type: 'не авторизован' });
    }
    const refrechToken = await this.jwtService.signAsync({
      id: usern.id,
      login: usern.login,
      rolesId: usern.rolesId,
    });
    const newsu = await this.userService.update(usern.id, refrechToken);
    if (!newsu) {
      throw new BadRequestException({ type: 'Ошибка записи' });
    }
    const options: JwtSignOptions = {
      secret: process.env.JWT_SECRET_A,
      expiresIn: '2h',
    };
    const accesToken = await this.jwtService.signAsync(
      { id: newsu.id, login: newsu.login, rolesId: newsu.rolesId },
      options,
    );
    return { refrechToken, accesToken };
  }
  async signOut(token: string) {
    const use = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_R,
    });
    if (!use) {
      throw new UnauthorizedException({ type: 'не авторизован' });
    }
    const refrechToken = '';
    const id = use.id as number;
    const newsu = await this.userService.update(id, refrechToken);
    if (!newsu) {
      throw new BadRequestException({ type: 'Ошибка записи' });
    }
    return { newsu };
  }
  async signIn(login: string, password: string) {
    const user = await this.userService.findByName(login);
    if (!user) {
      throw new UnauthorizedException({ type: 'Неверное имя или пароль' });
    }

    const hash = this.passwordService.getHash(password, user.salt);
    if (hash !== user.password) {
      throw new UnauthorizedException({ type: 'Неверное имя или пароль' });
    }

    const refrechToken = await this.jwtService.signAsync({
      id: user.id,
      login: user.login,
      rolesId: user.rolesId,
    });
    const newsu = await this.userService.update(user.id, refrechToken);
    if (!newsu) {
      throw new BadRequestException({ type: 'Ошибка записи' });
    }
    const options: JwtSignOptions = {
      secret: process.env.JWT_SECRET_A,
      expiresIn: '2h',
    };
    const accesToken = await this.jwtService.signAsync(
      { id: newsu.id, login: newsu.login, rolesId: newsu.rolesId },
      options,
    );
    return { refrechToken, accesToken };
  }
}
