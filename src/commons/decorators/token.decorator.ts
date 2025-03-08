import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenDTO } from 'src/auth/dtos/token.dto';

export const Token = createParamDecorator(
  (
    data: string,
    ctx: ExecutionContext,
  ): TokenDTO | string | number | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const token = request['tokenPayload'];
    if (!token) return;
    if (data) {
      return token[data];
    }
    return token;
  },
);
