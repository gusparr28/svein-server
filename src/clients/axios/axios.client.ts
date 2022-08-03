import axios, { AxiosResponse } from 'axios';
import { IAxiosClient } from './axios.client.interface';

export class AxiosClient implements IAxiosClient {
  async getWithBearerToken(url: string, token: string): Promise<AxiosResponse> {
    const data = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}
