import { User } from './user.model';

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  skills: string[];
}

export interface RegisterResponse {
  message: string;
  user: User;
  suggested_username?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
