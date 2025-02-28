import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user';

export const userRepositoryMock = {
  create: jest.fn(() => new User()),
  existsBy: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
};

export const UserRepositoryMockProvider = {
  provide: getRepositoryToken(User),
  useValue: userRepositoryMock,
};
