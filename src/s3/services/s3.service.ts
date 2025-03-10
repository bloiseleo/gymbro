export interface IS3Service {
  generatePutSignedUrl(key: string): Promise<string>;
  generateGetSignedUrl(key: string): Promise<string>;
}
