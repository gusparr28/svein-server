import { User } from '../persistence/entities/users/UserEntity';

export interface IUserService {
  save(user: User): Promise<User>;
}
