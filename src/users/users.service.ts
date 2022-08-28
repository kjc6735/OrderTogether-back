import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { Repository } from './../../node_modules/typeorm/browser/repository/Repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login({
    userId,
    password,
  }: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: {
        userId,
      },
    });

    //유저가 존재하지 않을 떄
    if (!user) {
      return {
        success: false,
        message: '존재하지 않는 유저입니다.',
      };
    }
    //비밀번호 해쉬가 맞을 때
    //json 내려주기
    if (bcrypt.compare(password, user.password)) {
      return {
        success: true,
        message: '로그인 성공',
      };
    }
  }

  async register({
    userId,
    password,
    zonecode,
    addressKo,
    addressEn,
    detail = null,
  }: RegisterRequestDto): Promise<RegisterResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          userId,
        },
      });
      if (user) {
        return {
          success: false,
          message: '이미 존재하는 아이디입니다.',
        };
      }
      const newUser = new User();
      user.userId = userId;
      user.password = await bcrypt.hash(password);
      user.zonecode = zonecode;
      user.addressKo = addressKo;
      user.addressEn = addressEn;
      user.detail = detail;
      await this.userRepository.save(newUser);
      return {
        success: true,
        message: '회원가입 성공',
      };
    } catch (e) {
      return {
        success: false,
        message: '회원가입 실패',
      };
    }
  }
}
