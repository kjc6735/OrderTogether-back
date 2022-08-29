import { JwtService } from './jwt.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'];
    if (!token)
      return {
        success: false,
        message: '로그인이 되어있지 않습니다.',
      };
    try {
      const decode = this.jwtService.verify(token); // return user id
      const user = await this.userRepository.findOne(decode.id);
      if (!user) {
        return {
          success: false,
          message: '유저를 찾을 수 없습니다.',
        };
      }
      req['user'] = user;
    } catch (e) {
      return {
        success: false,
        message: '토큰에러',
      };
    }
    next();
  }
}
