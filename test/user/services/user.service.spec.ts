import { Test } from '@nestjs/testing';
import { User } from '../../../src/user/entities/user';
import { UserService } from '../../../src/user/services/user.service.impl';
import {
  userRepositoryMock,
  UserRepositoryMockProvider,
} from 'test/mocks/user.repository.mock';
import { UsernameAlreadyTaken } from 'src/user/errors/username-already-taken.error';
import { UserNotFound } from 'src/user/errors/user-not-found.error';
import { InvalidId } from 'src/user/errors/invalid-id.error';

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
  describe('getUser', () => {
    it('should find the user by id', async () => {
      const user = new User();
      user.id = 0;
      user.password = '123';
      user.username = 'Leonardo';
      jest.spyOn(userRepositoryMock, 'findOneBy').mockResolvedValue(user);
      const response = await userService.getUser(user.id.toString());
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({
        id: user.id,
      });
      expect(response).toStrictEqual(user);
    });
    it('should not find the user by id', async () => {
      jest.spyOn(userRepositoryMock, 'findOneBy').mockResolvedValue(null);
      await expect(async () => await userService.getUser('1')).rejects.toThrow(
        UserNotFound,
      );
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({
        id: 1,
      });
    });
    it.each([['-1'], ['NaN']])(
      'should throw error due to invalid ID',
      async (id: string) => {
        expect(async () => await userService.getUser(id)).rejects.toThrow(
          InvalidId,
        );
        expect(userRepositoryMock.findOneBy).not.toHaveBeenCalledWith({
          id: Number.parseInt(id),
        });
      },
    );
  });
  describe('findUsername', () => {
    it('should find user by username', async () => {
      const user = new User();
      user.id = 1;
      user.password = '123';
      user.username = 'leo';
      jest.spyOn(userRepositoryMock, 'findOneBy').mockResolvedValue(user);
      const response = await userService.findUsername(user.username);
      expect(response).toStrictEqual(user);
      expect(userRepositoryMock.findOneBy).toHaveBeenCalledWith({
        username: user.username,
      });
    });
    it('should not find user by username and return undefined', async () => {
      jest.spyOn(userRepositoryMock, 'findOneBy').mockResolvedValue(null);
      const response = await userService.findUsername('123123');
      expect(response).toBeUndefined();
    });
  });
});
