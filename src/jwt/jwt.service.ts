import { User } from './../entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jsonwebtoken from 'jsonwebtoken';
import { Repository } from 'typeorm';
@Injectable()
export class JwtService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject('secretKey') private readonly secretKey,
  ) {
    console.log(this.secretKey);
  }

  sign({ id, userId }) {
    return jsonwebtoken.sign({ id, userId }, this.secretKey);
  }

  verify(token: string) {
    return jsonwebtoken.verify(token, this.secretKey);
  }

  async getUser(id) {
    try {
      const user = this.userRepository.findOne(id);
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}
