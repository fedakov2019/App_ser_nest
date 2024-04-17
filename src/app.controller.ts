import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './app.service';
import { PrismaClient } from '@prisma/client';
const prism= new PrismaClient();
@Controller('/api')
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Get('/users/page=:page/count=:count')
  async getUser(@Param('page') page: string, @Param('count') count: string) {
    const user= await prism.$queryRaw`select * from usersP1;`;
    console.log(user);
    return await this.userService.getUser(page, count);
  }
}
