import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddRoleDto, createdto, roleiddto, СreateRoledto } from './dto';
import { RolesService } from './roles.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { iduserdto } from 'src/auth/dtoauth';
@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private roleservice: RolesService) {}
  @Post()
  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ type: createdto })
  create(@Body() dto: СreateRoledto) {
    return this.roleservice.createRole(dto);
  }
  @Get('/:value')
  @ApiResponse({ type: roleiddto })
  @ApiOperation({ summary: 'Поиск роли' })
  getByValue(@Param('value') value: string) {
    return this.roleservice.getRoleByValue(value);
  }
  @ApiOperation({ summary: 'Сменить роль' })
  @ApiResponse({ type: iduserdto })
  @Roles('ADMIN')
  @UseGuards(AuthGuard)
  @Post('/userrole')
  addRole(@Body() dto: AddRoleDto) {
    return this.roleservice.addRole(dto);
  }
  @Get('/user/page=:page/count=:count')
  @ApiResponse({ type: [iduserdto] })
  @ApiOperation({ summary: 'Постраничный список пользователей' })
  getUserPage(@Param() page: string, count: string) {
    return this.roleservice.getUserPage(page, count);
  }
}
