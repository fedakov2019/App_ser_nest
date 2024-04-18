import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly userService: AppService) {}

  @Get('/users/page=:page/count=:count')
  async getUser(@Param('page') page: string, @Param('count') count: string) {
    return await this.userService.getUser(page, count);
  }
}
