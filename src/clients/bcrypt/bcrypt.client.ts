import { app } from '../../app';
import { IBcryptClient } from './bcrypt.client.interface';

export class BcryptClient implements IBcryptClient {
  async hash(password: string): Promise<string> {
    const hashedPassword = await app.bcrypt.hash(password);
    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    const passwordComparation = await app.bcrypt.compare(password, hashedPassword);
    if (!passwordComparation) throw new Error('Invalid password');
    return passwordComparation;
  }
}
