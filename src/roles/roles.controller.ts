import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddRoleDto, СreateRoledto } from './dto';
import { RolesService } from './roles.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private roleservice: RolesService) {}
  @Post()
  @ApiOperation({ summary: 'Создание роли' })
  create(@Body() dto: СreateRoledto) {
    return this.roleservice.createRole(dto);
  }
  @Get('/:value')
  @ApiOperation({ summary: 'Поиск роли' })
  getByValue(@Param('value') value: string) {
    return this.roleservice.getRoleByValue(value);
  }
  @ApiOperation({ summary: 'Сменить роль' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(AuthGuard)
  @Post('/userrole')
  addRole(@Body() dto: AddRoleDto) {
    return this.roleservice.addRole(dto);
  }
  @Get('/user/page=:page/count=:count')
  @ApiOperation({ summary: 'Постраничный список пользователей' })
  getUserPage(@Param('page') page: string, @Param('count') count: string) {
    return this.roleservice.getUserPage(page, count);
  }
}
