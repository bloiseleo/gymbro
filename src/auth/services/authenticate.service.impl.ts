import { Injectable } from '@nestjs/common';
import { IAuthenticateService } from './authenticate.service';
import { compareSync, hashSync } from 'bcrypt';
import { UserService } from 'src/user/services/user.service.impl';
import { CreateUserDTO } from 'src/commons/dtos/create-user.dto';
import { SignInDTO } from '../dtos/sign-in.dto';
import { User } from 'src/user/entities/user';
import { Unauthorized } from '../errors/unauthorized.error';
import { JwtService } from '@nestjs/jwt';
import { TokenDTO } from '../dtos/token.dto';

@Injectable()
export class AuthenticateService implements IAuthenticateService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  equals(plain: string, hash: string): boolean {
    return compareSync(plain, hash);
  }
  hashPassword(password: string): string {
    return hashSync(password, 3);
  }
  async signIn(data: SignInDTO): Promise<string> {
    const { username, password } = data;
    const user = await this.userService.findUsername(username);
    if (!user) {
      throw new Unauthorized(`username [${username}] was not found`);
    }
    if (!this.equals(password, user.password)) {
      throw new Unauthorized(`wrong password for user [username][${username}]`);
    }
    return this.jwtService.sign(TokenDTO.from(user));
  }
  signUp(data: CreateUserDTO): Promise<User> {
    const { username, password } = data;
    const hashedPassword = this.hashPassword(password);
    return this.userService.createUser(
      {
        username,
        password: hashedPassword,
      },
      true,
    );
  }
}
