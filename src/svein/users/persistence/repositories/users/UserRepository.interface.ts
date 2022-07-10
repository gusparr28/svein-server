import { User } from '../../entities/users/UserEntity';

export interface IUserRepository {
  save(user: User): Promise<User>;
}
