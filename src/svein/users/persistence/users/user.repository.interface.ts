import { User, UserContext } from '../../domain/model/User';
import { RequestUserDto } from '../../domain/user.dto';

export interface IUserRepository {
  save(userDto: Partial<RequestUserDto>, context?: UserContext): Promise<User>;
  findByUsernameOrEmail(user: string): Promise<User | null>;
  findByUsername(username: User['username']): Promise<User | null>;
  findByEmail(email: User['email']): Promise<User | null>;
  updateByEmail(email: string, userDto: Partial<Omit<RequestUserDto, 'email'>>, context: UserContext): Promise<User | null>;
}
