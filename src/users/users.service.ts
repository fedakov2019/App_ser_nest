import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}
  async findByName(login: string) {
    return await this.db.usersP1.findFirst({
      where: { login },
      include: { roles: true },
    });
  }
  async findByToken(token: string) {
    return await this.db.usersP1.findFirst({ where: { refrechtoken: token } });
  }
  async create(login: string, password: string, salt: string, rolesId: number) {
    return await this.db.usersP1.create({
      data: { login, password, salt, rolesId },
    });
  }
  async update(id: number, token: string) {
    return await this.db.usersP1.update({
      where: { id: id },
      data: { refrechtoken: token },
    });
  }
  async updateId(
    id: number,
    token: string,
    login: string,
    password: string,
    salt: string,
  ) {
    return await this.db.usersP1.update({
      where: { id: id },
      data: { refrechtoken: token, login, password, salt },
    });
  }
  async delete(id: number) {
    return await this.db.usersP1.delete({ where: { id: id } });
  }

  async UserId(id: number) {
    return await this.db.usersP1.findFirst({
      where: { id: id },
    });
  }
}
