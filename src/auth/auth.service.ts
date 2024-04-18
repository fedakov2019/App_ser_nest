import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}
  async signUp(login: string, password: string, acces: boolean) {
    const user = await this.userService.findByName(login);
    if (user) {
      throw new BadRequestException({ type: 'login - уже существует' });
    }
    const sals = this.passwordService.getSalt();
    const hach = this.passwordService.getHash(password, sals);
    const newUser = await this.userService.create(login, hach, sals, acces);
    const accesToken = await this.jwtService.signAsync({
      id: newUser.id,
      login: newUser.login,
      acces: newUser.acces,
    });
    const options: JwtSignOptions = {
      secret: process.env.JWT_SECRET_REFRECH,
      expiresIn: '30d',
    };
    const refrechToken = await this.jwtService.signAsync(
      { id: newUser.id, login: newUser.login, acces: newUser.acces },
      options,
    );

    return accesToken;
  }
  async signIn(login: string, password: string, acces: boolean) {}
}
