import { Test } from '@nestjs/testing';
import { User } from '../../../src/user/entities/user';
import { UserService } from '../../../src/user/services/user.service.impl';
import {
  userRepositoryMock,
  UserRepositoryMockProvider,
} from 'test/mocks/user.repository.mock';
import { UsernameAlreadyTaken } from 'src/user/errors/username-already-taken.error';

describe('UserService', () => {
  let userService: UserService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, UserRepositoryMockProvider],
    }).compile();
    userService = moduleRef.get(UserService);
  });
  describe('createUser', () => {
    it('should create user successfully without persisting the user to the database', async () => {
      jest.spyOn(userRepositoryMock, 'existsBy').mockResolvedValueOnce(false);
      const response = await userService.createUser({
        password: '123',
        username: '123',
      });
      const user = new User();
      user.password = '123';
      user.username = '123';
      expect(response).toStrictEqual(user);
      expect(userRepositoryMock.create).toHaveBeenCalled();
      expect(userRepositoryMock.existsBy).toHaveBeenCalledWith({
        username: '123',
      });
      expect(userRepositoryMock.save).not.toHaveBeenCalled();
    });
    it('should create user successfully persisting the user to the database', async () => {
      jest.spyOn(userRepositoryMock, 'existsBy').mockResolvedValueOnce(false);
      jest
        .spyOn(userRepositoryMock, 'save')
        .mockImplementationOnce((user) => Promise.resolve(user));
      const response = await userService.createUser(
        {
          password: '123',
          username: '123',
        },
        true,
      );
      const user = new User();
      user.password = '123';
      user.username = '123';
      expect(response).toStrictEqual(user);
      expect(userRepositoryMock.create).toHaveBeenCalled();
      expect(userRepositoryMock.existsBy).toHaveBeenCalledWith({
        username: '123',
      });
      expect(userRepositoryMock.save).toHaveBeenCalled();
    });
    it('should throw error when username was already taken', async () => {
      jest.spyOn(userRepositoryMock, 'existsBy').mockResolvedValueOnce(true);
      await expect(
        async () =>
          await userService.createUser({
            password: '123',
            username: '123',
          }),
      ).rejects.toThrow(UsernameAlreadyTaken);
      expect(userRepositoryMock.existsBy).toHaveBeenCalledWith({
        username: '123',
      });
    });
  });
});
