import { Module } from '@nestjs/common';
import { AuthenticateService } from './services/authenticate.service.impl';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: false,
          secret: configService.getOrThrow('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN') ?? '1 day',
          },
        };
      },
    }),
  ],
  providers: [AuthenticateService],
  controllers: [AuthController],
})
export class AuthModule {}
