import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/commons/dtos/create-user.dto';
import { AuthenticateService } from '../services/authenticate.service.impl';
import { HttpResponse } from 'src/commons/http-response';
import { CreatedUserDTO } from 'src/commons/dtos/created-user.dto';
import { SignInDTO } from '../dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthenticateService) {}
  @Post('sign-up')
  async signUp(@Body() payload: CreateUserDTO): Promise<HttpResponse> {
    const user = await this.authService.signUp(payload);
    const responseUser = CreatedUserDTO.from(user);
    return HttpResponse.created('user signed up successfully', responseUser);
  }
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() payload: SignInDTO): Promise<HttpResponse> {
    const token = await this.authService.signIn(payload);
    return HttpResponse.okWithData('user authenticated', {
      token,
    });
  }
}
