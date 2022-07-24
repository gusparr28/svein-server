import { ResponseUserDto } from '../user.dto';

export class User {
  id: string;

  email: string;

  username: string;

  password: string;

  constructor(
    email: string,
    username: string,
    password: string,
    id: string,
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
  }

  toDto(): ResponseUserDto {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
    };
  }
}
