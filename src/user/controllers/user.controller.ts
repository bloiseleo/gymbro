import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service.impl';
import { HttpResponse } from 'src/commons/http-response';
import { CreatedUserDTO } from 'src/commons/dtos/created-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<HttpResponse> {
    const user = await this.userService.getUser(id);
    const responseData = CreatedUserDTO.from(user);
    return HttpResponse.okWithData('user found successfully', responseData);
  }
}
