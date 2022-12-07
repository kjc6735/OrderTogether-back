import { IsEmpty } from 'class-validator';
import { User } from './../entities/user.entity';
import { JwtService } from './../jwt/jwt.service';
import { UsersService } from './users.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForbiddenException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => {
  return {
    compare: jest.fn(),
  };
});

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});
const mockJwtService = {
  sign: jest.fn(),
};
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UsersService;
  let userRepository: MockRepository<User>;
  beforeEach(async () => {
    const modules = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();
    service = modules.get<UsersService>(UsersService);
    userRepository = modules.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should null if user not exist', async () => {
      userRepository.findOne.mockReturnValue(null);
      try {
        const result = await service.login({
          userId: 'test',
          password: '1234',
        });
      } catch (e) {
        expect(e).toMatchObject(
          new ForbiddenException('존재하지 않는 아이디입니다.'),
        );
      }
    });
    it('should fail if uncorrect user password', async () => {
      userRepository.findOne.mockReturnValue({
        id: 1,
        userId: 'test',
        password: '1234',
      });
      bcrypt.compare.mockReturnValue(false);
      try {
        const result = await service.login({
          userId: 'test',
          password: '1234',
        });
      } catch (e) {
        expect(e).toMatchObject(
          new BadRequestException('비밀번호가 다릅니다.'),
        );
      }
    });
  });

  it.todo('register');
});
