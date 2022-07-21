import { User } from '@root/svein/users/persistence/entities/user.entity';
import { IUserRepository } from '@root/svein/users/persistence/repositories/users/user.repository.interface';

export class MockUserRepository implements IUserRepository {
  public mockUsers: User[] = [];

  async save(user: User): Promise<User> {
    this.mockUsers.push(user);
    return this.mockUsers.slice(-1)[0];
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.mockUsers.find((v) => v.username === username) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.mockUsers.find((v) => v.email === email) ?? null;
  }
}
