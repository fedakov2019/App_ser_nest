import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AddRoleDto, UserCount, СreateRoledto } from './dto';

@Injectable()
export class RolesService {
  constructor(private db: DbService) {}
  async createRole(dto: СreateRoledto) {
    const role = await this.db.roles.create({ data: { ...dto } });
    return role;
  }
  async getRoleByValue(value: string) {
    const role = await this.db.roles.findFirst({ where: { value } });
    return role;
  }
  async getRoleById(id: number) {
    const role = await this.db.roles.findFirst({ where: { id } });
    return role;
  }
  async addRole(dto: AddRoleDto) {
    const role = await this.db.roles.findFirst({ where: { value: dto.value } });
    if (role) {
      const user = await this.db.usersP1.update({
        where: { id: dto.userId },
        data: { rolesId: role?.id },
      });
      return user;
    }
    throw new HttpException('Pоль не найдена', HttpStatus.NOT_FOUND);
  }

  async getUserPage(page: string, count: string) {
    const user = await this.db
      .$queryRaw`EXEC	 [dbo].[Pading_UserP1] @PageSize = ${count}, @PageCount = ${page}`;
    const Counts = await this.db
      .$queryRaw<UserCount>`EXEC	 [dbo].[Pading2_UserP1] @PageSize = ${count}, @PageCount = ${page}`;
    return { user, ...Counts[0] };
  }
}
