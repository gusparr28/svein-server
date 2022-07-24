import { User } from '../../domain/model/User';
import { RequestUserDto } from '../../domain/user.dto';

export interface IUserRepository {
  save(userDto: RequestUserDto): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
