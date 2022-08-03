import { IAuthService, MappedUserInfo } from '@root/svein/auth/business/auth.service.interface';
import { User } from '@root/svein/users/domain/model/User';
import { SchemaType } from '@root/swagger/schemas';
import { FastifyRequest } from 'fastify';
import { UserSignIn, UserSignUp } from '@root/utils/types/auth';
import { RequestUserDto } from '@root/svein/users/domain/user.dto';
import { AxiosClient } from '../../../clients/axios/axios.client';
import { BcryptClient } from '../../../clients/bcrypt/bcrypt.client';
import { JwtClient } from '../../../clients/jwt/jwt.client';
import { IAjvClient } from '../../../clients/ajv/ajv.client.interface';
import { AjvClient } from '../../../clients/ajv/ajv.client';
import UserRepository from '../../../svein/users/persistence/users/impl/user.repository';
import AuthService from '../../../svein/auth/business/auth.service';

export default class AuthHandler {
  constructor(
    private readonly authService: IAuthService,
    private readonly ajvClient: IAjvClient,
  ) { }

  async signUp(schema: SchemaType, userSignUp: UserSignUp): Promise<User> {
    this.ajvClient.validateSchema(schema.body, userSignUp);
    return this.authService.signUp(userSignUp);
  }

  async signIn(schema: SchemaType, userSignIn: UserSignIn): Promise<string> {
    this.ajvClient.validateSchema(schema.body, userSignIn);
    return this.authService.signIn(userSignIn);
  }

  async facebookSignIn(request: FastifyRequest): Promise<MappedUserInfo> {
    return this.authService.facebookSignIn(request);
  }

  async googleSignIn(request: FastifyRequest): Promise<MappedUserInfo> {
    return this.authService.googleSignIn(request);
  }

  async update(userDto: RequestUserDto): Promise<User> {
    return this.authService.update(userDto);
  }

  public static instance(): AuthHandler {
    const userRepo = new UserRepository();
    const bcryptClient = new BcryptClient();
    const jwtClient = new JwtClient();
    const axiosClient = new AxiosClient();
    const authService = new AuthService(userRepo, bcryptClient, jwtClient, axiosClient);
    const ajvClient = new AjvClient();
    return new AuthHandler(authService, ajvClient);
  }
}
