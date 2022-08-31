import { User } from '../entities/user.entity';
import { JwtService } from '../jwt/jwt.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {
    console.log('jwt middleware');
  }
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('jwt muddleware');
    try {
      if (req.headers['token']) {
        const token = req.headers['token'];
        const decode = this.jwtService.verify(token);
        const user = this.jwtService.getUser(decode.id);
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
