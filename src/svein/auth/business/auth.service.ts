import { IUserRepository } from '@root/svein/users/persistence/users/user.repository.interface';
import { UserSignIn, UserSignUp } from '@root/utils/types/auth';
import { FastifyRequest } from 'fastify';
import { IBcryptClient } from '@root/clients/bcrypt/bcrypt.client.interface';
import { IJwtClient } from '@root/clients/jwt/jwt.client.interface';
import { IAxiosClient } from '@root/clients/axios/axios.client.interface';
import { RequestUserDto } from '@root/svein/users/domain/user.dto';
import { User, UserContext } from '../../users/domain/model/User';
import { emailRegex } from '../../../utils/emailRegex';
import { IAuthService, MappedUserInfo } from './auth.service.interface';
import { app } from '../../../app';

export default class AuthService implements IAuthService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly bcryptClient: IBcryptClient,
    private readonly jwtClient: IJwtClient,
    private readonly axiosClient: IAxiosClient,
  ) { }

  async signUp(userSignUp: UserSignUp): Promise<User> {
    const { username, email, password } = userSignUp;

    if (!email.toLowerCase().match(emailRegex)) {
      throw new Error('Invalid email');
    }

    const userByEmail = await this.userRepo.findByEmail(email);
    const userByUsername = await this.userRepo.findByUsername(username);

    await this.findOAuthUserByEmail(email);

    if (userByEmail && userByUsername) throw new Error('Username and email already in use');

    if (userByEmail && userByEmail.context === UserContext.svein) throw new Error('Email already in use');

    if (userByUsername) throw new Error('Username already in use');

    const hashedPassword = await this.bcryptClient.hash(password);

    return this.userRepo.save({
      email: email.toLowerCase().trim(),
      username: username.toLowerCase().trim(),
      password: hashedPassword,
    }, UserContext.svein);
  }

  async signIn(userSignIn: UserSignIn): Promise<string> {
    const { user, password } = userSignIn;

    const foundUser = await this.userRepo.findByUsernameOrEmail(user);
    if (!foundUser) throw new Error('User not registered');

    if (foundUser.context === UserContext.both) {
      await this.bcryptClient.compare(password, foundUser.password);
    } else {
      await this.findOAuthUserByEmail(foundUser.email);
    }

    await this.bcryptClient.compare(password, foundUser.password);

    return this.jwtClient.sign(foundUser.id);
  }

  async facebookSignIn(request: FastifyRequest): Promise<MappedUserInfo> {
    const tokenData = await app.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    const USER_INFO_URL: string = 'https://graph.facebook.com/v6.0/me?fields=id,name,email,picture';

    const { data: { name, email, picture: { data: { url } } } } = await this.axiosClient
      .getWithBearerToken(
        USER_INFO_URL,
        tokenData.access_token,
      );

    const userByEmail = await this.userRepo.findByEmail(email);

    if (userByEmail && userByEmail.context === UserContext.svein) {
      await this.userRepo.updateByEmail(userByEmail.email, {}, UserContext.both);
    } else {
      await this.saveOAuthUserByEmail(email);
    }

    return {
      token: tokenData.access_token,
      name,
      email,
      picture: url,
    };
  }

  async googleSignIn(request: FastifyRequest): Promise<MappedUserInfo> {
    const tokenData = await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    const USER_INFO_URL: string = 'https://www.googleapis.com/oauth2/v2/userinfo';

    const { data: { email, name, picture } } = await this.axiosClient
      .getWithBearerToken(
        USER_INFO_URL,
        tokenData.access_token,
      );

    const userByEmail = await this.userRepo.findByEmail(email);

    if (userByEmail && userByEmail.context === UserContext.svein) {
      await this.userRepo.updateByEmail(userByEmail.email, {}, UserContext.both);
    } else {
      await this.saveOAuthUserByEmail(email);
    }

    return {
      token: tokenData.access_token,
      name,
      email,
      picture,
    };
  }

  async update(userDto: RequestUserDto): Promise<User> {
    const { username, password } = userDto;

    const hashedPassword = await this.bcryptClient.hash(password);

    const updatedUser = await this.userRepo.updateByEmail(userDto.email, {
      username: username.toLowerCase().trim(),
      password: hashedPassword,
    }, UserContext.both);

    if (!updatedUser) throw new Error('Missing entity');

    return updatedUser;
  }

  private async saveOAuthUserByEmail(email: string): Promise<void> {
    const userByEmail = await this.userRepo.findByEmail(email);

    if (!userByEmail) {
      await this.userRepo.save({
        email,
      }, UserContext.oauth);
    }
  }

  private async findOAuthUserByEmail(email: string): Promise<void> {
    const userByEmail = await this.userRepo.findByEmail(email);

    if (userByEmail && userByEmail.context === UserContext.oauth) {
      throw new Error('Email already exists in OAuth');
    }
  }
}
