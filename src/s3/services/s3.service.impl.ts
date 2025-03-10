import { IS3Service } from './s3.service';
import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable({
  scope: Scope.REQUEST,
})
export class S3Service implements IS3Service {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = this.buildClient();
  }

  generatePutSignedUrl(key: string): Promise<string> {
    return this.generateSignUrl(this.buildPutCommand(key));
  }

  generateGetSignedUrl(key: string): Promise<string> {
    return this.generateSignUrl(this.buildGetCommand(key));
  }

  private buildClient(): S3Client {
    return new S3Client({
      credentials: {
        accessKeyId: this.configService.getOrThrow('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('S3_SECRET_ACCESS_KEY'),
      },
      region: this.configService.getOrThrow('S3_REGION'),
    });
  }

  private buildPutCommand(key: string): PutObjectCommand {
    return new PutObjectCommand({
      Bucket: this.configService.getOrThrow('S3_BUCKET'),
      Key: key,
    });
  }

  private buildGetCommand(key: string): GetObjectCommand {
    return new GetObjectCommand({
      Bucket: this.configService.getOrThrow('S3_BUCKET'),
      Key: key,
    });
  }

  private generateSignUrl(
    command: PutObjectCommand | GetObjectCommand,
  ): Promise<string> {
    return getSignedUrl(this.s3Client, command, {
      expiresIn: 360,
    });
  }
}
