import { User } from '@root/svein/users/persistence/entities/users/UserEntity';
import { IUserRepository } from '@root/svein/users/persistence/repositories/users/UserRepository.interface';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const promisifyScrypt = promisify(scrypt);

export default class AuthService {
  constructor(private readonly userRepo: IUserRepository) { }

  async save(user: User): Promise<User> {
    const salt = randomBytes(8).toString('hex');

    const hash = (await promisifyScrypt(user.password, salt, 16)) as Buffer;

    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    return this.userRepo.save({
      ...user,
      password: hashedPassword,
    });
  }
}
