import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    AuthModule,
    RolesModule,
    // ConfigModule.forRoot({ envFilePath: '.env' }),
    // SequelizeModule.forRoot({
    //   dialect: 'mssql',
    //   host: process.env.MSSQL_HOST,
    //  port: Number(process.env.MSSQL_PORT),
    //  username: process.env.MSSQL_username,
    //  password: process.env.MSSQL_password,
    // database: process.env.MSSQL_database,
    // dialectOptions: {
    // options: {
    // encrypt: false,
    //  enableArithAbort: true,
    // },
    // },
    //}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
