import { IUserRepository } from '../persistence/users/user.repository.interface';
import { IUserService } from './user.service.interface';

export default class UserService implements IUserService {
  constructor(private readonly userRepo: IUserRepository) { }
}
