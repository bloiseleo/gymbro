import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UserService } from '../services/user.service.impl';
import { HttpResponse } from 'src/commons/http-response';
import { CreatedUserDTO } from 'src/commons/dtos/created-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
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
