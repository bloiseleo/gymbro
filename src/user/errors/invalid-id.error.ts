import { HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/commons/base.error';

export class InvalidId extends BaseError {
  constructor(id: string) {
    super(
      `id [${id}] is invalid. it must be a valid numeric value bigger than 0`,
      HttpStatus.UNPROCESSABLE_ENTITY,
      `id [${id}] is invalid. it must be a valid numeric value bigger than 0`,
      `id [${id}] is invalid. it must be a valid numeric value bigger than 0`,
    );
  }
}
