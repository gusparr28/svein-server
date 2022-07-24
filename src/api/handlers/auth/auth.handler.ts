import { IAuthService } from '@root/svein/auth/business/auth.service.interface';
import { User } from '@root/svein/users/domain/model/User';
import { SchemaType } from '@root/swagger/schemas';
import { RequestUserDto } from '@root/svein/users/domain/user.dto';
import { IAjvClient } from '../../../clients/ajv/ajv.client.interface';
import { AjvClient } from '../../../clients/ajv/ajv.client';
import UserRepository from '../../../svein/users/persistence/users/impl/user.repository';
import AuthService from '../../../svein/auth/business/auth.service';

export default class AuthHandler {
  constructor(
    private readonly authService: IAuthService,
    private readonly ajvClient: IAjvClient,
  ) { }

  async signUp(schema: SchemaType, userDto: RequestUserDto): Promise<User> {
    this.ajvClient.validateSchema(schema.body, userDto);
    return this.authService.signUp(userDto);
  }

  async signIn(schema: SchemaType, userDto: RequestUserDto): Promise<string | undefined> {
    this.ajvClient.validateSchema(schema.body, userDto);
    return this.authService.signIn(userDto);
  }

  public static instance(): AuthHandler {
    const userRepo = new UserRepository();
    const authService = new AuthService(userRepo);
    const ajvClient = new AjvClient();
    return new AuthHandler(authService, ajvClient);
  }
}
