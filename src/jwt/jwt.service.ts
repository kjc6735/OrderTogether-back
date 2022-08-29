import { Repository } from './../../node_modules/typeorm/browser/repository/Repository';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import * as jsonwebtoken from 'jsonwebtoken';
@Injectable()
export class JwtService {
  constructor(@Inject('secretKey') private readonly secretKey) {
    console.log(this.secretKey);
  }

  sign({ id, userId }) {
    return jsonwebtoken.sign({ id, userId }, this.secretKey);
  }

  verify(token: string) {
    return jsonwebtoken.verify(token, this.secretKey);
  }
}
