import { RoomMember } from './../entities/roomMember.entity';
import { Room } from './../entities/room.entity';
import { changeAddressToCoordinate } from './../utils/geolocationApi';
import { User } from './../entities/user.entity';
import { JwtService } from './../jwt/jwt.service';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,

    @InjectRepository(RoomMember)
    private readonly roomMemberRepository: Repository<RoomMember>,
    private readonly jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(UsersService.name);

  async login({
    userId,
    password,
  }: LoginRequestDto): Promise<LoginResponseDto> {
    this.logger.log('login ');
    // try {
    const user = await this.userRepository.findOne({
      where: {
        userId,
      },
    });

    if (!user) throw new ForbiddenException('존재하지 않는 아이디입니다.');
    //비밀번호 해쉬가 맞을 때

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new BadRequestException('비밀번호가 다릅니다.');
    }
    const { password: pwd, ...withoutPasswordUser } = user;
    this.logger.log('test4');
    return {
      success: true,
      message: '로그인 성공',
      token: this.jwtService.sign({ id: user.id, userId: user.userId }),
      user: withoutPasswordUser,
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
    const user = await this.userRepository.findOne({
      where: {
        userId,
      },
    });

    if (user) throw new ForbiddenException('이미 존재하는 아이디입니다..');

    const newUser = new User();
    newUser.userId = userId;
    newUser.displayName = displayName;
    newUser.password = password;
    newUser.zonecode = zonecode;
    newUser.addressKo = addressKo;
    newUser.addressEn = addressEn;
    newUser.detail = detail;
    await this.userRepository.save(newUser);
    return {
      success: true,
      message: '회원가입 성공',
    };
  }

}
