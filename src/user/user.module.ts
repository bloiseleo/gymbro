import { Module } from '@nestjs/common';
import { UserService } from './services/user.service.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
