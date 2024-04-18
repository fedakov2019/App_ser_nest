import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    const salt = this.passwordService.getSalt();
    const hach = this.passwordService.getHash(password, salt);
    const newUser = await this.userService.create(login, hach, salt, acces);
    const accesToken = await this.jwtService.signAsync({
      id: newUser.id,
      login: newUser.login,
      acces: newUser.acces,
    });
    const options: JwtSignOptions = {
      secret: process.env.JWT_SECRET_R,
      expiresIn: '1d',
    };
    const refrechToken = await this.jwtService.signAsync(
      { id: newUser.id, login: newUser.login, acces: newUser.acces },
      options,
    );
    const newsu= await this.userService.update(newUser.id,refrechToken);

    return {refrechToken,accesToken};
  }
  async signIn(login: string, password: string) {
    const user = await this.userService.findByName(login);
    if (!user) {
      throw new UnauthorizedException();
    }
    
    const hash = this.passwordService.getHash(password, user.salt);
    if (hash!==user.password) {
      throw new UnauthorizedException();
    }
    
    const accesToken = await this.jwtService.signAsync({
      id: user.id,
      login: user.login,
      acces: user.acces,
    });
    const options: JwtSignOptions = {
      secret: process.env.JWT_SECRET_R,
      expiresIn: '1d',
    };
    const refrechToken = await this.jwtService.signAsync(
      { id: user.id, login: user.login, acces: user.acces },
      options,
    );
    const newsu= await this.userService.update(user.id,refrechToken);

    return {refrechToken,accesToken};
  }
}
