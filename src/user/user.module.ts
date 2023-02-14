import { Module } from '@nestjs/common';
import { UserRepositoryModule } from './infrastructure';
import { UserService } from './app';

@Module({
  providers: [UserService],
  imports: [UserRepositoryModule],
  exports: [UserService],
})
export class UserModule {}
