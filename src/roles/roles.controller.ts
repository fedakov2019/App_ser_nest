import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { СreateRoledto } from './dto';
import { RolesService } from './roles.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
@ApiTags('Роли')
@Controller('roles')
export class RolesController {
constructor(private roleservice:RolesService) {}
@Post()
@ApiOperation({summary:'Создание роли'})
create(@Body() dto:СreateRoledto) {
    return this.roleservice.createRole(dto);
} 
@Get('/:value')

@ApiOperation({summary:'Поиск роли'})
getByValue(@Param('value') value:string)
{
   return this.roleservice.getRoleByValue(value); 
}
}