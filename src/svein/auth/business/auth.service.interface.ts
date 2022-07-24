import { RequestUserDto } from '@root/svein/users/domain/user.dto';
import { User } from '@root/svein/users/domain/model/User';

export interface IAuthService {
  signUp(userDto: RequestUserDto): Promise<User>;
  signIn(userDto: RequestUserDto): Promise<string | undefined>;
}
