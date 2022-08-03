import { User } from '@root/svein/users/domain/model/User';
import { RequestUserDto } from '@root/svein/users/domain/user.dto';
import { UserSignIn, UserSignUp } from '@root/utils/types/auth';
import { FastifyRequest } from 'fastify';

export interface IAuthService {
  signUp(userSignUp: UserSignUp): Promise<User>;
  signIn(userSignIn: UserSignIn): Promise<string>;
  facebookSignIn(request: FastifyRequest): Promise<MappedUserInfo>;
  googleSignIn(request: FastifyRequest): Promise<MappedUserInfo>;
  update(userDto: RequestUserDto): Promise<User>;
}

export type MappedUserInfo = {
  token: string;
  name: string;
  email: string;
  picture: string;
};
