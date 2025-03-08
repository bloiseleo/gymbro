import { Module } from '@nestjs/common';
import { AuthenticateService } from './services/authenticate.service.impl';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UserModule],
  providers: [AuthenticateService],
  controllers: [AuthController],
})
export class AuthModule {}
