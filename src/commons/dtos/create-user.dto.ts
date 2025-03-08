import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description:
      "username of the user. it'll be used to perform authentication. it must be unique and the max size of the username length is 22",
    required: true,
  })
  @IsNotEmpty()
  @Length(3, 22)
  username: string;
  @ApiProperty({
    description:
      "password of the user. it'll be used to perform authentication alongside the username",
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
