export interface IJwtClient {
  sign(id: string): string;
}
