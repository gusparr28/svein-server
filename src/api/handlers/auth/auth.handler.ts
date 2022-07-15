import { IAuthService } from '@root/svein/auth/business/auth.service.interface';
import { User } from '@root/svein/users/persistence/entities/user.entity';
import UserRepository from '../../../svein/users/persistence/repositories/users/impl/user.repository';
import AuthService from '../../../svein/auth/business/auth.service';

export default class AuthHandler {
  constructor(private readonly authService: IAuthService) { }

  async signUp(user: User): Promise<User> {
    return this.authService.signUp(user);
  }

  async signIn(user: User): Promise<string | undefined> {
    return this.authService.signIn(user);
  }

  public static instance(): AuthHandler {
    const userRepo = new UserRepository();
    const authService = new AuthService(userRepo);
    return new AuthHandler(authService);
  }
}
