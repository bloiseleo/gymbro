import { CreateUserDTO } from 'src/commons/dtos/create-user.dto';
import { User } from 'src/user/entities/user';
import { SignInDTO } from '../dtos/sign-in.dto';

export interface IAuthenticateService {
  hashPassword(password: string): string;
  equals(plain: string, hash: string): boolean;
  signIn(data: SignInDTO): Promise<string>;
  signUp(data: CreateUserDTO): Promise<User>;
}
