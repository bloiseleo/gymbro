import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenDTO } from '../dtos/token.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  private extractToken(request: Request): string | undefined {
    const authorizationHeader = request.header('Authorization');
    if (!authorizationHeader) {
      return;
    }
    return authorizationHeader.replace('Bearer ', '');
  }
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) return false;
    const payload = this.jwtService.verify<TokenDTO>(token);
    request['tokenPayload'] = payload;
    return true;
  }
}
