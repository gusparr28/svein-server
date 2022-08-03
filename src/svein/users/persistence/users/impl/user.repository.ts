import { RequestUserDto } from '@root/svein/users/domain/user.dto';
import UserModel from '../../model/user.model';
import { User, UserContext } from '../../../domain/model/User';
import { IUserRepository } from '../user.repository.interface';

export default class UserRepository implements IUserRepository {
  async save(userDto: Partial<RequestUserDto>, context?: UserContext): Promise<User> {
    const newUser = new UserModel({ ...userDto, context });

    await newUser.save();

    return newUser;
  }

  async findByUsernameOrEmail(user: string): Promise<User | null> {
    const foundUser = await UserModel.findOne<User>({
      $or: [{ email: user }, { username: user }],
    });
    return foundUser ?? null;
  }

  async findByUsername(username: User['username']): Promise<User | null> {
    const user = await UserModel.findOne<User>({ username });

    return user ?? null;
  }

  async findByEmail(email: User['email']): Promise<User | null> {
    const user = await UserModel.findOne<User>({ email });

    return user ?? null;
  }

  async updateByEmail(email: string, userDto: Partial<Omit<RequestUserDto, 'email'>>, context: UserContext): Promise<User | null> {
    const { username, password } = userDto;
    const updatedUser = await UserModel.findOneAndUpdate<User>({
      email,
    }, {
      username,
      password,
      context,
    }, {
      new: true,
    });
    return updatedUser ?? null;
  }
}
