import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/commons/dtos/create-user.dto';
import { AuthenticateService } from '../services/authenticate.service.impl';
import { HttpResponse } from 'src/commons/http-response';
import { CreatedUserDTO } from 'src/commons/dtos/created-user.dto';
import { SignInDTO } from '../dtos/sign-in.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TokenDTO } from '../dtos/token.dto';

type TokenResponse = {
  token: string;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthenticateService) {}
  @Post('sign-up')
  @ApiOperation({
    summary: 'creates an user',
    description:
      'creates an user with the provided username and password. this user can be used to perform authentication and retrieve the token needed to go further into the application',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'user created successfully',
    type: HttpResponse<CreatedUserDTO>,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'invalid data provided to create user',
  })
  async signUp(
    @Body() payload: CreateUserDTO,
  ): Promise<HttpResponse<CreatedUserDTO>> {
    const user = await this.authService.signUp(payload);
    const responseUser = CreatedUserDTO.from(user);
    return HttpResponse.created('user signed up successfully', responseUser);
  }
  @Post('sign-in')
  @ApiOperation({
    summary: 'sign in an user',
    description:
      'sign in an user and retrieves the token used for authentication',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user authenticated successfully',
    type: HttpResponse<TokenResponse>,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'user not authenticated',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'invalid data provided to authenticate',
  })
  async signIn(
    @Body() payload: SignInDTO,
  ): Promise<HttpResponse<TokenResponse>> {
    const token = await this.authService.signIn(payload);
    return HttpResponse.okWithData('user authenticated', {
      token,
    });
  }
}
