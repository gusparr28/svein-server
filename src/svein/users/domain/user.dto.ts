import { User } from './model/User';

export interface RequestUserDto {
  email: string;
  username: string;
  password: string;
}

export interface ResponseUserDto {
  id: string;
  email: string;
  username: string;
}

export const toDto = (user: User): ResponseUserDto => ({
  id: user.id,
  email: user.email,
  username: user.username,
});
