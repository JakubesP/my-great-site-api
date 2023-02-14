import { User } from '../../domain';

export type CreateUserData = Omit<User, 'id'>;

export interface UserRepositoryInterface {
  create(data: CreateUserData): Promise<User>;
  getOneByEmail(email: string): Promise<User | null>;
}
