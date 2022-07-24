import UserModel from '../../model/user.model';
import { User } from '../../../domain/model/User';
import { IUserRepository } from '../user.repository.interface';

export default class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    const newUser = new UserModel(user);

    await newUser.save();

    return newUser;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne<User>({ username });

    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne<User>({ email });

    return user ?? null;
  }
}
