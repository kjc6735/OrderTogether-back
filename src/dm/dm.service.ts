import { DmGateway } from './../events/dm.gateway';
import { DM } from './../entities/dm.entity';
import { Room } from './../entities/room.entity';
import { User } from './../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class DmService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Room) private readonly roomsRepository: Repository<Room>,
    @InjectRepository(DM) private readonly dmsRepository: Repository<DM>,
    private readonly dmGateway: DmGateway,
  ) {
    console.log(dmGateway);
  }

  async findRoom() {}
}
