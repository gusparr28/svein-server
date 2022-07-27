import { User } from '@root/svein/users/domain/model/User';
import { IUserRepository } from '@root/svein/users/persistence/users/user.repository.interface';
import { SignIn, SignUp } from '@root/utils/types/auth';
import { FastifyRequest } from 'fastify';
import { OAuth2Token } from '@fastify/oauth2';
import { IBcryptClient } from '@root/clients/bcrypt/bcrypt.client.interface';
import { IJwtClient } from '@root/clients/jwt/jwt.client.interface';
import { emailRegex } from '../../../utils/emailRegex';
import { IAuthService } from './auth.service.interface';
import { app } from '../../../app';

export default class AuthService implements IAuthService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly bcryptClient: IBcryptClient,
    private readonly jwtClient: IJwtClient,
  ) { }

  async signUp(validatedSchema: SignUp): Promise<User> {
    const { username, email, password } = validatedSchema;

    if (!email.toLowerCase().match(emailRegex)) {
      throw new Error('Invalid email');
    }

    const hashedPassword = await this.bcryptClient.hash(password);

    return this.userRepo.save({
      email: email.toLowerCase().trim(),
      username: username.toLowerCase().trim(),
      password: hashedPassword,
    });
  }

  async signIn(validatedSchema: SignIn): Promise<string | undefined> {
    const { email, username, password } = validatedSchema;

    let token;

    if (email && username) throw new Error('Cannot login with username and email at the same time');

    if (!email && !username) throw new Error('Cannot login without username or email');

    if (email) {
      const foundUser = await this.userRepo.findByEmail(email);
      if (!foundUser) throw new Error('User not registered');
      await this.bcryptClient.compare(password, foundUser.password);
      token = this.jwtClient.sign(foundUser.id);
    }

    if (username) {
      const foundUser = await this.userRepo.findByUsername(username);
      if (!foundUser) throw new Error('User not registered');
      await this.bcryptClient.compare(password, foundUser.password);
      token = this.jwtClient.sign(foundUser.id);
    }

    return token;
  }

  async facebookSignIn(request: FastifyRequest): Promise<OAuth2Token> {
    const tokenData = await app.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    return tokenData;
  }

  async googleSignIn(request: FastifyRequest): Promise<OAuth2Token> {
    const tokenData = await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    return tokenData;
  }
}
