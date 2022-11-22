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
      }
    } catch (e) {
    } finally {
      next();
    }
  }
}
