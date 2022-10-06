import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggedInMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('loggedin middleware');
    if (!req['user']) {
      console.log('not found user');
      throw new BadRequestException('not found user');
    }

    next();
  }
}
