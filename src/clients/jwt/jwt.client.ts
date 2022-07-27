import { v4 } from 'uuid';
import { app } from '../../app';
import { IJwtClient } from './jwt.client.interface';

export class JwtClient implements IJwtClient {
  sign(id: string): string {
    return app.jwt.sign({
      token: `${id}-${v4()}`,
    });
  }
}
