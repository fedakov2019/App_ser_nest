import { Injectable } from '@nestjs/common';

import { Sequelize } from 'sequelize-typescript';

import { json } from 'sequelize';

@Injectable()
export class AppService {
  constructor(
    private readonly connection: Sequelize,
    // ...
  ) {}

  async getUser(page: string, count: string) {
    const [result, er] = await this.connection.query(
      'exec [dbo].[Pading_UserP1] @PageSize=' + count + ', @PageCount=' + page,
    );
    return json({ ...result });
  }
}
