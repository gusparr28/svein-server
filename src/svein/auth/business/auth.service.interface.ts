import { User } from '@root/svein/users/domain/model/User';
import { SignIn, SignUp } from '@root/utils/types/auth';
import { FastifyRequest } from 'fastify';

export interface IAuthService {
  signUp(validatedSchema: SignUp): Promise<User>;
  signIn(validatedSchema: SignIn): Promise<string | undefined>;
  facebookSignIn(request: FastifyRequest): Promise<MappedUserInfo>;
  googleSignIn(request: FastifyRequest): Promise<MappedUserInfo>;
}

export type MappedUserInfo = {
  token: string;
  name: string;
  email: string;
  picture: string;
};
