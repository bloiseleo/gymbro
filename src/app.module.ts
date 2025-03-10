import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InfraModule } from './infra/infra.module';
import { AuthModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [UserModule, InfraModule, AuthModule, S3Module],
  controllers: [],
})
export class AppModule {}
