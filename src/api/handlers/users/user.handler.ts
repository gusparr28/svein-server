import UserRepository from '../../../svein/users/persistence/repositories/users/impl/user.repository';
import { IUserService } from '../../../svein/users/business/user.service.interface';
import UserService from '../../../svein/users/business/user.service';

export default class UserHandler {
  constructor(private readonly userService: IUserService) { }

  public static instance(): UserHandler {
    const userRepo = new UserRepository();
    const userService = new UserService(userRepo);
    return new UserHandler(userService);
  }
}
