import { HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/commons/base.error';

export class Unauthorized extends BaseError {
  constructor(debugMessage: string) {
    super(debugMessage, HttpStatus.UNAUTHORIZED, debugMessage, 'unauthorized');
  }
}
