import { User } from '@root/svein/users/persistence/entities/users/UserEntity';
import UserRepository from '../../../svein/users/persistence/repositories/users/impl/UserRepository';
import { IUserService } from '../../../svein/users/business/UserService.interface';
import UserService from '../../../svein/users/business/UserService';

export default class UserHandler {
  constructor(private readonly userService: IUserService) { }

  async save(user: User): Promise<User> {
    return this.userService.save(user);
  }

  public static instance(): UserHandler {
    const userRepo = new UserRepository();
    const userService = new UserService(userRepo);
    return new UserHandler(userService);
  }
}
