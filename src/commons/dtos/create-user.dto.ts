import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @Length(3, 22)
  username: string;
  @IsNotEmpty()
  password: string;
}
