import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class СreateRoledto {
    @ApiProperty({
        example: 'USER',
      })
      @IsNotEmpty({ message: 'роль не пустое значение' })
    value:string;
    @ApiProperty({
        example: 'Пользователь',
      })
      @IsString({ message: 'описание строка' })
    description:string;

}