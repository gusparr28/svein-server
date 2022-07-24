import { User } from '@root/svein/users/domain/model/User';
import { SignIn, SignUp } from '@root/utils/types/auth';

export interface IAuthService {
  signUp(validatedSchema: SignUp): Promise<User>;
  signIn(validatedSchema: SignIn): Promise<string | undefined>;
}
