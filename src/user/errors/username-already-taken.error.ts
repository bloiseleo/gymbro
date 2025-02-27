import { HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/commons/base.error';

export class UsernameAlreadyTaken extends BaseError {
  constructor(username: string) {
    super(
      `username [${username}] is already taken`,
      HttpStatus.UNPROCESSABLE_ENTITY,
      `username [${username}] is already taken`,
      `username [${username}] is already taken`,
    );
  }
}
