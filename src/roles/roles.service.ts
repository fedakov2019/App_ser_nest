import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { СreateRoledto } from './dto';

@Injectable()
export class RolesService {
    constructor(private db: DbService) {}
    async createRole(dto:СreateRoledto)
    {
        const role= await this.db.roles.create({data:{...dto}})
        return role;

    }
    async getRoleByValue(value:string){
        const role=await this.db.roles.findFirst({where:{value}})
        return role;

    }
}
