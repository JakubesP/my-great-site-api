import { UserService, CreateUserDto } from '@/user/app';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryImpl } from '@/user/infrastructure';
import { EmailIsTakenException } from '@/user';
import { MockUserRepositoryImpl } from './common';

const mockCreateUserDto: CreateUserDto = {
  email: 'jan@domain.com',
  nick: 'Jan',
  password_hash: 'HASH',
};

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockUserRepositoryImpl;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepositoryImpl, useClass: MockUserRepositoryImpl },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<MockUserRepositoryImpl>(UserRepositoryImpl);
  });

  beforeEach(() => {
    userRepository.records = [];
  });

  describe('create', () => {
    it('resolves User if userRepository.create resolves User', async () => {
      const result = await service.create(mockCreateUserDto);

      expect(result).toEqual({
        ...mockCreateUserDto,
        id: userRepository.lastRecord().id,
      });
    });

    it('throws EmailIsTakenException if userRepository.create throws ConflictException', async () => {
      // The email is taken
      userRepository.create(mockCreateUserDto);

      expect(service.create(mockCreateUserDto)).rejects.toThrow(
        EmailIsTakenException,
      );
    });
  });

  describe('getOneByEmail', () => {
    it('resolves User if userRepository.getOneByEmail resolves User', async () => {
      userRepository.create(mockCreateUserDto);

      const result = await service.findOneByEmail(mockCreateUserDto.email);

      expect(result).toEqual({
        ...mockCreateUserDto,
        id: userRepository.lastRecord().id,
      });
    });

    it('resolves null if userRepository.getOneByEmail resolves null', async () => {
      const result = await service.findOneByEmail(mockCreateUserDto.email);

      expect(result).toBe(null);
    });
  });
});
