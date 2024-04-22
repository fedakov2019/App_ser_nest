import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpBodyDto {
  @ApiProperty({
    example: 'test',
  })
  @IsNotEmpty({ message: 'логин не пустое значение' })
  login: string;
  @MinLength(4, {
    message: 'минимальная длинна пароля 3 символа',
  })
  @ApiProperty({
    example: '1234',
  })
  password: string;
}
export class SignUpdateDto {
  @ApiProperty({
    example: 1,
  })
  @IsInt({ message: 'id не строка' })
  id: number;
  @ApiProperty({
    example: 'test',
  })
  @IsNotEmpty({ message: 'логин не пустое значение' })
  login: string;
  @MinLength(4, {
    message: 'минимальная длинна пароля 3 символа',
  })
  @ApiProperty({
    example: '1234',
  })
  password: string;
}


export class SignInBodyDto {
  @ApiProperty({
    example: 'test',
  })
  @IsNotEmpty({ message: 'логин не пустое значение' })
  login: string;
  @ApiProperty({
    example: '1234',
  })
  @MinLength(4, {
    message: 'минимальная длинна пароля 3 символа',
  })
  password: string;
}

export class GetSessionInfoDto {
  @ApiProperty({
    example: 1,
  })
  id: number;
  @ApiProperty({
    example: 'test',
  })
  login: string;
  @ApiProperty({
    example: 1,
  })
  rolesId: number;
  @ApiProperty({
    example: 'USER',
  })
  valueRole: string;
  @ApiProperty()
  'iat': number;
  @ApiProperty()
  'exp': number;
}
