import { RoomMember } from './../entities/roomMember.entity';
import { DmGateway } from './../events/dm.gateway';
import { DM } from './../entities/dm.entity';
import { Room } from './../entities/room.entity';
import { User } from './../entities/user.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class DmService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Room) private readonly roomsRepository: Repository<Room>,
    @InjectRepository(DM) private readonly dmsRepository: Repository<DM>,
    @InjectRepository(RoomMember)
    private readonly roomMemberRepository: Repository<RoomMember>,

    private readonly dmGateway: DmGateway,
  ) {
    console.log(dmGateway);
  }

  async getDM(user, roomId) {
    const isRoom = await this.roomMemberRepository.findOne({
      where: {
        user: user.id,
        room: roomId,
      },
    });
    if (!isRoom) throw new BadRequestException('잘못된 요청입니다.');
    return this.dmsRepository.find({
      where: {
        room: isRoom,
      },
    });
  }

  async createDM(user, roomId, message) {
    // const isRoomMember = await this.roomMemberRepository.findOne({
    //   where: {
    //     user: user.id,
    //     room: roomId,
    //   },
    // });
    // if (!isRoomMember) throw new BadRequestException('잘못된 요청입니다.');
    const isRoomMember = await this.roomMemberRepository
      .createQueryBuilder('roomMember')
      .leftJoin('roomMember.user', 'user')
      .leftJoin('roomMember.room', 'room')
      .where('room.name = :name', { name: roomId })
      .andWhere('roomMember.userId = :userId', { userId: user.id })
      .andWhere('roomMember.roomId = :roomId', {})
      .getOne();
    const dm = new DM();
    dm.mesage = message;
    dm.room = roomId;
    dm.sender = user.id;
    await this.dmsRepository.save(dm);
  }

  async getMyDmList(user) {
    const myRoom = await this.roomMemberRepository.find({
      where: {
        user: user.id,
      },
    });
    console.log(myRoom);
  }
}
