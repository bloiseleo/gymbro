import { HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/commons/base.error';

export class UserNotFound extends BaseError {
  constructor(id: string) {
    super(
      `user of id [${id}] was not found`,
      HttpStatus.NOT_FOUND,
      `user of id [${id}] was not found`,
      `user of id [${id}] was not found`,
    );
  }
}
