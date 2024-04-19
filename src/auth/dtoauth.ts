import { ApiProperty } from '@nestjs/swagger';

export class SignUpBodyDto {
  @ApiProperty({
    example: 'test',
  })
  login: string;
  @ApiProperty({
    example: '1234',
  })
  password: string;
  @ApiProperty({
    example: 'true',
  })
  access: boolean;
}

export class SignInBodyDto {
  @ApiProperty({
    example: 'test',
  })
  login: string;
  @ApiProperty({
    example: '1234',
  })
  password: string;
}

export class GetSessionInfoDto {
  @ApiProperty({
    example: '1',
  })
  id: number;
  @ApiProperty({
    example: 'test',
  })
  login: string;
  @ApiProperty({
    example: 'true',
  })
  access: boolean;
}
