import { CreateUserData, UserRepositoryInterface } from '@/user/app';
import { User } from '@prisma/client';
import { RepositoryConflictException } from '@/common';

export class MockUserRepositoryImpl implements UserRepositoryInterface {
  public records: User[] = [];

  async create(data: CreateUserData): Promise<User> {
    if (this.records.find(({ email }) => data.email === email))
      throw new RepositoryConflictException('The email is taken');
    const item = { ...data, id: Math.random().toString() };
    this.records.push(item);
    return item;
  }

  async getOneByEmail(email: string): Promise<User | null> {
    return this.records.find((user) => user.email === email) ?? null;
  }

  lastRecord(): User {
    return this.records[this.records.length - 1];
  }
}
