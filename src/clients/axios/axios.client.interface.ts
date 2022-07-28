import { AxiosResponse } from 'axios';

export interface IAxiosClient {
  getWithBearerToken(url: string, token: string): Promise<AxiosResponse>;
}
