import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaService } from '@/prisma/prisma.service';

export const UserRepositoryImpl = 'UserRepositoryImpl';

@Module({
  providers: [
    PrismaService,
    UserRepository,
    {
      provide: UserRepositoryImpl,
      useExisting: UserRepository,
    },
  ],
  exports: [UserRepositoryImpl],
})
export class UserRepositoryModule {}
