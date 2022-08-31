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
    try {
      if (req.headers['token']) {
        const token = req.headers['token'];
        const decode = this.jwtService.verify(token);
        const user = await this.userRepository.findOne({
          where: { id: decode.id },
        });
        if (user) {
          req['user'] = user;
        }
      }
    } catch (e) {
      console.log(e);
    }

    next();
  }
}
