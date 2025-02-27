import { HttpStatus } from '@nestjs/common';

export abstract class BaseError extends Error {
  constructor(
    message: string,
    public httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public debugMessage: string = message,
    public userMessage?: string,
  ) {
    super(message);
  }
}
