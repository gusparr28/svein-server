import { User, UserContext } from '@root/svein/users/domain/model/User';
import { RequestUserDto } from '@root/svein/users/domain/user.dto';
import { IUserRepository } from '@root/svein/users/persistence/users/user.repository.interface';

export class MockUserRepository implements IUserRepository {
  public mockUsers: User[] = [];

  async save(user: User): Promise<User> {
    this.mockUsers.push(user);
    return this.mockUsers.slice(-1)[0];
  }

  async findByUsernameOrEmail(user: string): Promise<User | null> {
    return this.mockUsers.find((v) => v.username === user || v.email === user) ?? null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.mockUsers.find((v) => v.username === username) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.mockUsers.find((v) => v.email === email) ?? null;
  }

  async updateByEmail(email: string, userDto: Partial<Omit<RequestUserDto, 'email'>>, context: UserContext): Promise<User | null> {
    const { username, password } = userDto;

    if (!username || !password) throw new Error('Missing properties');

    const index = this.mockUsers.findIndex((v) => v.email === email);

    if (index === -1) return null;

    this.mockUsers[index].username = username;
    this.mockUsers[index].password = password;
    this.mockUsers[index].context = context;

    return this.mockUsers[index];
  }
}
