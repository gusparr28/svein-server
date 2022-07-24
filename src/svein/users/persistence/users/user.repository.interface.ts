import { User } from '../../domain/model/User';
import { RequestUserDto } from '../../domain/user.dto';

export interface IUserRepository {
  save(userDto: RequestUserDto): Promise<User>;
  findByUsername(username: User['username']): Promise<User | null>;
  findByEmail(email: User['email']): Promise<User | null>;
}
