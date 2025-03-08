import { User } from 'src/user/entities/user';

export class TokenDTO {
  private constructor(
    public username: string,
    public id: string,
    public iat?: number,
    public exp?: number,
  ) {}
  static from(user: User): TokenDTO {
    return {
      username: user.username,
      id: user.id.toString(),
    };
  }
}
