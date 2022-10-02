import { changeAddressToCoordinate } from './../utils/geolocationApi';
import { User } from './../entities/user.entity';
import { JwtService } from './../jwt/jwt.service';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

    if (!bcrypt.compare(password, user.password)) {
      return {
        success: false,
        message: '비밀번호를 잘못 입력했습니다.',
      };
    }

    return {
      success: true,
      message: '로그인 성공',
      token: this.jwtService.sign({ id: user.id, userId: user.userId }),
      displayName: user.displayName,
    };
  }

  async register({
    userId,
    displayName,
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
      const { lat, lng } = await changeAddressToCoordinate(addressKo)[0]
        .results;
      const newUser = new User();
      newUser.userId = userId;
      newUser.displayName = displayName;
      newUser.password = await bcrypt.hash(password, 11);
      newUser.zonecode = zonecode;
      newUser.addressKo = addressKo;
      newUser.addressEn = addressEn;
      newUser.detail = detail;
      newUser.latitude = lat;
      newUser.longitude = lng;
      await this.userRepository.save(newUser);
      return {
        success: true,
        message: '회원가입 성공',
      };
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: '회원가입 실패',
      };
    }
  }
}
