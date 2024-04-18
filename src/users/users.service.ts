import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}
  findByName(login: string) {
    return this.db.usersP1.findFirst({ where: { login } });
  }
  create(login: string, password: string, sals: string, acces: boolean) {
    return this.db.usersP1.create({ data: { login, password, sals, acces } });
  }
}
