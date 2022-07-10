import UserModel from '../../../model/users/UserModel';
import { User } from '../../../entities/users/UserEntity';
import { IUserRepository } from '../UserRepository.interface';

export default class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    const newUser = new UserModel(user);

    await newUser.save();

    return newUser;
  }
}
