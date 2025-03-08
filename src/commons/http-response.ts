import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HttpResponse<T> {
  @ApiProperty({
    description: 'time when the response was generated',
  })
  public time: number;
  @ApiPropertyOptional({
    description: 'possible data attached to the body response',
  })
  public data: T | undefined;
  @ApiProperty({
    description: 'message attached to the body response',
  })
  public message: string;
  @ApiProperty({
    description: 'http response status',
  })
  public status: HttpStatus;
  constructor(message: string, status: HttpStatus) {
    this.time = Date.now();
    this.message = message;
    this.status = status;
  }
  private static basic<T>(
    message: string,
    status: HttpStatus,
    data: T | undefined,
  ) {
    const response = new HttpResponse<T>(message, status);
    if (data !== undefined) response.data = data;
    return response;
  }
  static created<T>(message: string, data: T) {
    return this.basic(message, HttpStatus.CREATED, data);
  }
  static okWithData<T>(message: string, data: T) {
    return this.basic(message, HttpStatus.OK, data);
  }
}
