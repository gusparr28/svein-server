import { UserSignUp } from '@root/utils/types/auth';
import { IBcryptClient } from '@root/clients/bcrypt/bcrypt.client.interface';
import { IJwtClient } from '@root/clients/jwt/jwt.client.interface';
import { IAxiosClient } from '@root/clients/axios/axios.client.interface';
import { AxiosClient } from '../../../src/clients/axios/axios.client';
import { app } from '../../../src/app';
import { BcryptClient } from '../../../src/clients/bcrypt/bcrypt.client';
import { JwtClient } from '../../../src/clients/jwt/jwt.client';
import { MockUserRepository } from '../../__mocks__/repositories/mock.user.repository';
import { IUserRepository } from '../../../src/svein/users/persistence/users/user.repository.interface';
import { IAuthService } from '../../../src/svein/auth/business/auth.service.interface';
import AuthService from '../../../src/svein/auth/business/auth.service';

describe('Auth Service', () => {
  let userToSignUp: UserSignUp;
  const password: string = '1234';
  let hashedPassword: string;

  let mockUserRepository: IUserRepository;
  let bcryptClient: IBcryptClient;
  let jwtClient: IJwtClient;
  let axiosClient: IAxiosClient;
  let authService: IAuthService;

  beforeAll(async () => {
    hashedPassword = await app.bcrypt.hash(password);
  });

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    bcryptClient = new BcryptClient();
    jwtClient = new JwtClient();
    axiosClient = new AxiosClient();
    authService = new AuthService(mockUserRepository, bcryptClient, jwtClient, axiosClient);

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

  it('should successfully sign in a user with email and return a token', async () => {
    const createdUser = await mockUserRepository.save(userToSignUp);

    const { email } = createdUser;

    const token = await authService.signIn({
      user: email,
      password,
    });

    expect(token).toBeDefined();
  });

  it('should successfully sign in a user with username and return a token', async () => {
    const createdUser = await mockUserRepository.save(userToSignUp);

    const { username } = createdUser;

    const token = await authService.signIn({
      user: username,
      password,
    });

    expect(token).toBeDefined();
  });

  it('should throw an invalid password error', async () => {
    const createdUser = await mockUserRepository.save(userToSignUp);

    const { email } = createdUser;

    await expect(authService.signIn({
      user: email,
      password: '1235',
    })).rejects.toThrow('Invalid password');
  });
});
