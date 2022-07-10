import { User } from '@root/svein/users/persistence/entities/users/UserEntity';

export interface IAuthService {
  save(user: User): Promise<User>;
}
