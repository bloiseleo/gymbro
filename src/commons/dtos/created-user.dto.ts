import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user';

export class CreatedUserDTO {
  @ApiProperty({
    description: 'user id',
  })
  public id: string;
  @ApiProperty({
    description: 'user username',
  })
  public username: string;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }

  static from(user: User) {
    return new CreatedUserDTO(user.id.toString(), user.username);
  }
}
