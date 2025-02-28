import { User } from 'src/user/entities/user';

export class TokenDTO {
  private constructor(
    public username: string,
    public id: string,
  ) {}
  static from(user: User) {
    return new TokenDTO(user.username, user.id.toString());
  }
}
