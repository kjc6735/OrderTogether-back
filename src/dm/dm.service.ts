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
  ) {}

  async findRoom(myId, receiver) {
    try {
      const room = await this.dmsRepository.findOne({
        where: [
          { receiver: myId, sender: receiver },
          { receiver: receiver, sender: myId },
        ],
      });
      if (room)
        return {
          roomId: room.room,
        };
      return null;
    } catch (e) {
      console.log('dm error');
      return {
        success: false,
        message: 'dm error',
      };
    }
  }
  async createRoom(myId, receiver) {
    try {
      const newRoom = new Room();
      newRoom.name = uuidv4();
      await this.roomsRepository.save(newRoom);
      
      return {
        success: true,
        message: '룸 생성 성공 ',
        data: {
          roonId: newRoom.name,
        },
      };
    } catch (e) {}
  }
}
