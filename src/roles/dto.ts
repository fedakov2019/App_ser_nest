import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class СreateRoledto {
  @ApiProperty({
    example: 'USER',
  })
  @IsNotEmpty({ message: 'роль не пустое значение' })
  value: string;
  @ApiProperty({
    example: 'Пользователь',
  })
  @IsString({ message: 'описание строка' })
  description: string;
}
export class AddRoleDto {
  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({
    example: 'USER',
  })
  value: string;
  @IsNumber({}, { message: 'Должно быть числом' })
  @ApiProperty({
    example: 1,
  })
  userId: number;
}
export class createdto {
  id: number;
  value: string;
  description: string;
}
export class UserCount {
  totalCount: string;
}
export class roleiddto {
  id: number;
  description: string;
  value: string;
}
