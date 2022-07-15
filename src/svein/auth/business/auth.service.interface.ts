import { User } from '@root/svein/users/persistence/entities/user.entity';

export interface IAuthService {
  signUp(user: User): Promise<User>;
  signIn(user: User): Promise<string | undefined>;
}
