import { UserService } from 'src/user/services/user.service.impl';

export const userServiceMock = {
  findUsername: jest.fn(),
  createUser: jest.fn(),
} as object as UserService;
export const UserServiceMockToken = {
  provide: UserService,
  useValue: userServiceMock,
};
