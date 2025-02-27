import { HttpStatus } from '@nestjs/common';

export class HttpResponse {
  public time: number;
  constructor(
    public message: string,
    public status: HttpStatus,
  ) {
    this.time = Date.now();
  }
  private static basic(
    message: string,
    status: HttpStatus,
    ...appendable: { key: string; value: unknown }[]
  ) {
    const response = new HttpResponse(message, status);
    appendable.forEach(({ key, value }) => {
      response[key] = value;
    });
    return response;
  }
  static created(message: string, data: unknown) {
    return this.basic(message, HttpStatus.CREATED, {
      key: 'data',
      value: data,
    });
  }
  static okWithData(message: string, data: unknown) {
    return this.basic(message, HttpStatus.OK, {
      key: 'data',
      value: data,
    });
  }
}
