import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'];
    if (!token)
      return {
        success: false,
        message: '로그인이 되어있지 않습니다.',
      };
    
    next();
  }
}
