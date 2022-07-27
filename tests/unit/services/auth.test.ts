import { SignUp } from '@root/utils/types/auth';
import { IBcryptClient } from '@root/clients/bcrypt/bcrypt.client.interface';
import { IJwtClient } from '@root/clients/jwt/jwt.client.interface';
import { app } from '../../../src/app';
import { BcryptClient } from '../../../src/clients/bcrypt/bcrypt.client';
import { JwtClient } from '../../../src/clients/jwt/jwt.client';
import { MockUserRepository } from '../../__mocks__/repositories/mock.user.repository';
import { IUserRepository } from '../../../src/svein/users/persistence/users/user.repository.interface';
import { IAuthService } from '../../../src/svein/auth/business/auth.service.interface';
import AuthService from '../../../src/svein/auth/business/auth.service';

describe('Auth Service', () => {
  let userToSignUp: SignUp;
  const password: string = '1234';
  let hashedPassword: string;

  let mockUserRepository: IUserRepository;
  let bcryptClient: IBcryptClient;
  let jwtClient: IJwtClient;
  let authService: IAuthService;

  beforeAll(async () => {
    hashedPassword = await app.bcrypt.hash(password);
  });

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    bcryptClient = new BcryptClient();
    jwtClient = new JwtClient();
    authService = new AuthService(mockUserRepository, bcryptClient, jwtClient);

    userToSignUp = {
      email: 'test@gmail.com',
      username: 'test',
      password: hashedPassword,
    };
  });

  it('should successfully sign up a user', async () => {
    const user = await authService.signUp(userToSignUp);
    expect(user).toBeDefined();
  });

  it('should throw an invalid email error', async () => {
    userToSignUp = {
      ...userToSignUp,
      email: 'test',
    };

    await expect(authService.signUp(userToSignUp)).rejects.toThrow('Invalid email');
  });

  it('should successfully sign in a user and return a token', async () => {
    const createdUser = await mockUserRepository.save(userToSignUp);

    const { email } = createdUser;

    const token = await authService.signIn({
      email,
      password,
    });

    expect(token).toBeDefined();
  });

  it('should throw a cannot login with username and email at the same time error', async () => {
    const createdUser = await mockUserRepository.save(userToSignUp);

    const { email, username } = createdUser;

    await expect(authService.signIn({
      email,
      username,
      password,
    })).rejects.toThrow('Cannot login with username and email at the same time');
  });

  it('should throw a cannot login without username or email', async () => {
    await mockUserRepository.save(userToSignUp);

    await expect(authService.signIn({
      password,
    })).rejects.toThrow('Cannot login without username or email');
  });

  it('should throw an invalid password error', async () => {
    const createdUser = await mockUserRepository.save(userToSignUp);

    const { email } = createdUser;

    await expect(authService.signIn({
      email,
      password: '1235',
    })).rejects.toThrow('Invalid password');
  });
});
