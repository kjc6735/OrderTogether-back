import { User } from '../entities/user.entity';
import { JwtService } from '../jwt/jwt.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers['token']) {
        const token = req.headers['token'];
        const decode = this.jwtService.verify(token);
        const user = await this.jwtService.getUser(decode.id);
        req['user'] = user ?? null;
        console.log(req['user'] ?? 'error');
        console.log('user is ', req['user']);
      } else {
        console.log('zz');
      }
    } catch (e) {
      console.log(e);
    } finally {
      next();
    }
  }
}
