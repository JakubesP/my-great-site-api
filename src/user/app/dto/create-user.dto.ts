import { User } from '../../domain';

export type CreateUserDto = Omit<User, 'id'>;
