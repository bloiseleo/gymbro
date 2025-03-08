import { Test } from '@nestjs/testing';
import { TokenDTO } from 'src/auth/dtos/token.dto';
import { Unauthorized } from 'src/auth/errors/unauthorized.error';
import { IAuthenticateService } from 'src/auth/services/authenticate.service';
import { AuthenticateService } from 'src/auth/services/authenticate.service.impl';
import { CreateUserDTO } from 'src/commons/dtos/create-user.dto';
import { User } from 'src/user/entities/user';
import { compareSync, hashSync } from 'bcrypt';
import {
  jwtServiceMock,
  JwtServiceMockToken,
} from 'test/mocks/jwt.service.mock';
import {
  userServiceMock,
  UserServiceMockToken,
} from 'test/mocks/user.service.mock';

jest.mock('bcrypt', () => {
  return {
    compareSync: jest.fn(),
    hashSync: jest.fn(),
  };
});

describe('AuthenticateService', () => {
  let authenticateService: IAuthenticateService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserServiceMockToken,
        JwtServiceMockToken,
        AuthenticateService,
      ],
    }).compile();
    authenticateService = moduleRef.get(AuthenticateService);
  });
  describe('signIn', () => {
    it('should sign in successfully', async () => {
      const username = 'leonardo.bloise';
      const password = '12312312321';
      const token = '123123';
      const findUsernameResponse = new User();
      findUsernameResponse.id = 1;
      findUsernameResponse.password = password;
      findUsernameResponse.username = username;
      jest
        .spyOn(userServiceMock, 'findUsername')
        .mockResolvedValueOnce(findUsernameResponse);
      jest.spyOn(jwtServiceMock, 'sign').mockReturnValueOnce(token);
      (compareSync as jest.Mock).mockReturnValueOnce(true);
      const response = await authenticateService.signIn({
        password,
        username,
      });

      expect(userServiceMock.findUsername).toHaveBeenCalledWith(username);
      expect(jwtServiceMock.sign).toHaveBeenCalledWith(
        TokenDTO.from(findUsernameResponse),
      );
      expect(compareSync).toHaveBeenCalledWith(password, password);
      expect(response).toStrictEqual(token);
    });
    it('should not sign in successfully due to not found user', async () => {
      const username = 'leonardo.bloise';
      jest
        .spyOn(userServiceMock, 'findUsername')
        .mockResolvedValueOnce(undefined);
      expect(
        async () =>
          await authenticateService.signIn({
            password: '123',
            username,
          }),
      ).rejects.toThrow(Unauthorized);
      expect(userServiceMock.findUsername).toHaveBeenCalledWith(username);
    });
    it('should not sign in successfully due to unmatched password', async () => {
      const username = 'leonardo.bloise';
      const password = '12312312321';
      const findUsernameResponse = new User();
      findUsernameResponse.id = 1;
      findUsernameResponse.password = authenticateService.hashPassword('22222');
      findUsernameResponse.username = username;
      jest
        .spyOn(userServiceMock, 'findUsername')
        .mockResolvedValueOnce(findUsernameResponse);
      (compareSync as jest.Mock).mockReturnValueOnce(false);
      expect(async () =>
        authenticateService.signIn({
          password,
          username,
        }),
      ).rejects.toThrow(Unauthorized);

      expect(userServiceMock.findUsername).toHaveBeenCalledWith(username);
    });
  });
  describe('signUp', () => {
    it('should sign up successfully', async () => {
      const dto: CreateUserDTO = {
        password: '123',
        username: '123',
      };
      (hashSync as jest.Mock).mockResolvedValueOnce(dto.password);
      jest.spyOn(userServiceMock, 'createUser').mockImplementation(async () => {
        const u = new User();
        u.id = 0;
        u.password = dto.password;
        u.username = dto.username;
        return u;
      });
      const userCreated = await authenticateService.signUp(dto);
      expect(userCreated.id).toStrictEqual(0);
      expect(userCreated.username).toStrictEqual(dto.username);
      expect(hashSync).toHaveBeenCalledWith(dto.password, 3);
    });
  });
});
