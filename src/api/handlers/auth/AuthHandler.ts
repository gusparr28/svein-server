import { IAuthService } from '@root/svein/auth/business/AuthService.interface';
import { User } from '@root/svein/users/persistence/entities/users/UserEntity';
import UserRepository from '../../../svein/users/persistence/repositories/users/impl/UserRepository';
import AuthService from '../../../svein/auth/business/AuthService';

export default class AuthHandler {
  constructor(private readonly authService: IAuthService) {}

  async save(user: User): Promise<User> {
    return this.authService.save(user);
  }

  public static instance(): AuthHandler {
    const userRepo = new UserRepository();
    const authService = new AuthService(userRepo);
    return new AuthHandler(authService);
  }
}
