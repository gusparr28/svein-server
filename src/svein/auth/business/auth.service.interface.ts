import { User } from '@root/svein/users/persistence/entities/user.entity';
import { SignIn, SignUp } from '@root/utils/types/auth';

export interface IAuthService {
  signUp(user: SignUp): Promise<User>;
  signIn(user: SignIn): Promise<string | undefined>;
}
