import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InfraModule } from './infra/infra.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, InfraModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
