import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from './ports';
import { UserRepositoryImpl } from '../infrastructure';
import { CreateUserDto } from './dto';
import { User } from '@prisma/client';
import { to } from 'await-to-js';
import { RepositoryConflictException } from '@/common';
import { EmailIsTakenException } from './exceptions';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositoryImpl) private userRepository: UserRepositoryInterface,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const [error, user] = await to(this.userRepository.create(data));

    if (error) {
      if (error instanceof RepositoryConflictException)
        throw new EmailIsTakenException(
          'The user email is already taken',
          error,
        );
      throw error;
    }

    return user;
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.getOneByEmail(email);
  }
}
