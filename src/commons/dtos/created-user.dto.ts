import { User } from 'src/user/entities/user';

export class CreatedUserDTO {
  constructor(
    public id: string,
    public username: string,
  ) {}

  static from(user: User) {
    return new CreatedUserDTO(user.id.toString(), user.username);
  }
}
