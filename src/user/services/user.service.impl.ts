import { Repository } from 'typeorm';
import { CreateUserDTO } from '../../commons/dtos/create-user.dto';
import { IUserService } from './user.service';
import { User } from '../entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UsernameAlreadyTaken } from '../errors/username-already-taken.error';
import { InvalidId } from '../errors/invalid-id.error';
import { UserNotFound } from '../errors/user-not-found.error';

export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createUser(
    data: CreateUserDTO,
    persist: boolean = false,
  ): Promise<User> {
    const { username, password } = data;
    if (
      await this.userRepository.existsBy({
        username,
      })
    ) {
      throw new UsernameAlreadyTaken(username);
    }
    const user = this.userRepository.create();
    user.password = password;
    user.username = username;
    return persist ? await this.userRepository.save(user) : user;
  }
  async getUser(id: string): Promise<User> {
    const idParsed = Number.parseInt(id);
    if (Number.isNaN(idParsed) || idParsed < 0) {
      throw new InvalidId(id);
    }
    const user = await this.userRepository.findOneBy({
      id: idParsed,
    });
    if (user === null) {
      throw new UserNotFound(id);
    }
    return user;
  }
  async findUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({
      username,
    });
    if (user === null) return;
    return user;
  }
}
