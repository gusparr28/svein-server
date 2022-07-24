import { RequestUserDto } from '@root/svein/users/domain/user.dto';
import UserModel from '../../model/user.model';
import { User } from '../../../domain/model/User';
import { IUserRepository } from '../user.repository.interface';

export default class UserRepository implements IUserRepository {
  async save(userDto: RequestUserDto): Promise<User> {
    const newUser = new UserModel(userDto);

    await newUser.save();

    return newUser;
  }

  async findByUsername(username: User['username']): Promise<User | null> {
    const user = await UserModel.findOne<User>({ username });

    return user ?? null;
  }

  async findByEmail(email: User['email']): Promise<User | null> {
    const user = await UserModel.findOne<User>({ email });

    return user ?? null;
  }
}
