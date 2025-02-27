import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [UserModule, InfraModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
