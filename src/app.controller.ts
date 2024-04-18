import { Controller, Get, Param } from '@nestjs/common';
import { UsersService1 } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly userService: UsersService1) {}

  @Get('/users/page=:page/count=:count')
  async getUser(@Param('page') page: string, @Param('count') count: string) {
    return await this.userService.getUser(page, count);
  }
}
