import { JwtService } from '@nestjs/jwt';

export const jwtServiceMock = {
  sign: jest.fn(),
} as object as JwtService;
export const JwtServiceMockToken = {
  provide: JwtService,
  useValue: jwtServiceMock,
};
