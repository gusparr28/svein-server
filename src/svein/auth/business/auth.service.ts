import { User } from '@root/svein/users/domain/model/User';
import { IUserRepository } from '@root/svein/users/persistence/users/user.repository.interface';
import { v4 } from 'uuid';
import { SignIn, SignUp } from '@root/utils/types/auth';
import { emailRegex } from '../../../utils/emailRegex';
import { IAuthService } from './auth.service.interface';
import { app } from '../../../app';

export default class AuthService implements IAuthService {
  constructor(private readonly userRepo: IUserRepository) { }

  async signUp(validatedSchema: SignUp): Promise<User> {
    const { username, email, password } = validatedSchema;

    if (!email.toLowerCase().match(emailRegex)) {
      throw new Error('Invalid email');
    }

    const hashedPassword = await app.bcrypt.hash(password);

    return this.userRepo.save({
      email: email.toLowerCase().trim(),
      username: username.toLowerCase().trim(),
      password: hashedPassword,
    });
  }

  async signIn(validatedSchema: SignIn): Promise<string | undefined> {
    const { email, username, password } = validatedSchema;

    let token;

    if (email && username) throw new Error('Cannot login with username and email at the same time');

    if (!email && !username) throw new Error('Cannot login without username or email');

    if (email) {
      const foundUser = await this.userRepo.findByEmail(email);
      if (!foundUser) throw new Error('User not registered');
      const passwordComparation = await app.bcrypt.compare(password, foundUser.password);
      if (!passwordComparation) throw new Error('Invalid password');
      token = app.jwt.sign({
        token: `${foundUser.id}-${v4()}`,
      });
    }

    if (username) {
      const foundUser = await this.userRepo.findByUsername(username);
      if (!foundUser) throw new Error('User not registered');
      const passwordComparation = await app.bcrypt.compare(password, foundUser.password);
      if (!passwordComparation) throw new Error('Invalid password');
      token = app.jwt.sign({
        token: `${foundUser.id}-${v4()}`,
      });
    }

    return token;
  }
}
