import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDTO {
  @ApiProperty({
    description: 'username for authentication',
    required: true,
  })
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    description: 'password for authentication',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
