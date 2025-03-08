import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service.impl';
import { HttpResponse } from 'src/commons/http-response';
import { CreatedUserDTO } from 'src/commons/dtos/created-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Token } from 'src/commons/decorators/token.decorator';
import { Unauthorized } from 'src/auth/errors/unauthorized.error';

@Controller('users')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({
    description: 'retrieve user information about the current logged in user',
    summary: 'retrieve current user information',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: HttpResponse<CreatedUserDTO>,
  })
  async me(@Token('id') id?: string): Promise<HttpResponse<CreatedUserDTO>> {
    if (!id)
      throw new Unauthorized(
        'no token provided to extract information about the user',
      );
    const user = await this.userService.getUser(id);
    return HttpResponse.okWithData('me', CreatedUserDTO.from(user));
  }

  @Get(':id')
  @ApiOperation({
    description: 'retrieve user information from id',
    summary: 'retrieve user information',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: HttpResponse<CreatedUserDTO>,
  })
  async getUser(
    @Param('id') id: string,
  ): Promise<HttpResponse<CreatedUserDTO>> {
    const user = await this.userService.getUser(id);
    const responseData = CreatedUserDTO.from(user);
    return HttpResponse.okWithData('user found successfully', responseData);
  }
}
