import { CreateUserDTO } from '../../commons/dtos/create-user.dto';
import { User } from '../entities/user';

export interface IUserService {
  createUser(data: CreateUserDTO, persist: boolean): Promise<User>;
  getUser(id: string): Promise<User>;
  findUsername(username: string): Promise<User | undefined>;
}
