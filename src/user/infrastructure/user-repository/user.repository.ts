import { Injectable } from '@nestjs/common';
import { CreateUserData, UserRepositoryInterface } from '../../app';
import { User } from '../../domain';
import { PrismaService } from '@/prisma';
import { mapUserToDomain } from './mapper';
import { User as UserModel } from '@prisma/client';
import { to } from 'await-to-js';
import { RepositoryConflictException } from '@/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateUserData): Promise<User> {
    const [error, user] = await to<UserModel>(
      this.prismaService.user.create({
        data,
      }),
    );

    if (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new RepositoryConflictException(
          'Conflict to add new user',
          error,
        );
      }

      throw error;
    }

    return mapUserToDomain(user);
  }

  async getOneByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user ? mapUserToDomain(user) : null;
  }
}
