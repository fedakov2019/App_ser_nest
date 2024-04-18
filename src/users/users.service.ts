import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}
  findByName(login: string) {
    return this.db.usersP1.findFirst({ where: { login } });
  }
  create(login: string, password: string, salt: string, acces: boolean) {
    return this.db.usersP1.create({ data: { login, password, salt, acces } });
  }
  update( id:number,token:string) {
    return this.db.usersP1.update({where: {id:id}, data:{refrechtoken:token} });
  }
}
