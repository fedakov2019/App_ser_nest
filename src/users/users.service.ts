import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}
  async findByName(login: string) {
    return await this.db.usersP1.findFirst({ where: { login } });
  }
  async create(login: string, password: string, salt: string, acces: boolean) {
    return await this.db.usersP1.create({
      data: { login, password, salt, acces },
    });
  }
  async update(id: number, token: string) {
    return await this.db.usersP1.update({
      where: { id: id },
      data: { refrechtoken: token },
    });
  }
}
