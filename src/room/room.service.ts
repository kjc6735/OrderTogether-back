import { Post } from './../entities/post.entity';
import { RoomMember } from './../entities/roomMember.entity';
import { Room } from './../entities/room.entity';
import { User } from './../entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,

    @InjectRepository(RoomMember)
    private readonly roomMemberRepository: Repository<RoomMember>,
  ) {}

  async getMyRoom(user) {
    return this.roomMemberRepository.findOne({
      where: {
        user: user.id,
      },
      relations: {
        user: true,
      },
    });
  }

  async createRoomByPostId(user, postId) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
      relations: {
        user: true,
      },
    });

    if (user.id === post.user.id)
      throw new BadRequestException('자신에게 보내기 안됨');
    if (!post) throw new BadRequestException('not exist post');

    const isRoom = await this.roomMemberRepository
      .createQueryBuilder('roomMember')

      .leftJoin('roomMember.user', 'user')
      .leftJoin('roomMember.room', 'room')
      .addSelect('user.userId')
      .addSelect('room.name')
      // .addSelect('roomMember.userId', 'userId')
      // .addSelect('roomMember.roomId', 'roomId')
      .addSelect('COUNT(room.id)', 'cnt')
      .where('user.id=:id', { id: user.id })
      .orWhere('user.id=:id2', { id2: post.userId })
      .groupBy('room.name')
      .having('`cnt`>1')
      .getOne();
    delete post.user.password;

    if (isRoom)
      return {
        user: post.user,
        room: isRoom.room,
      };
    const newRoom = new Room();
    newRoom.id = null;
    newRoom.name = uuidv4();
    await this.roomRepository.save(newRoom);
    const roomMember1 = new RoomMember();
    const roomMember2 = new RoomMember();

    roomMember1.room = newRoom;
    roomMember1.user = user;
    roomMember2.room = newRoom;
    roomMember2.user = post.user;

    await this.roomMemberRepository.save([roomMember1, roomMember2]);

    const roomMember = await this.roomMemberRepository
      .createQueryBuilder('roomMember')
      .leftJoin('roomMember.user', 'user')
      .leftJoin('roomMember.room', 'room')
      .addSelect('user.userId')
      .addSelect('room.name')
      // .addSelect('roomMember.userId', 'userId')
      // .addSelect('roomMember.roomId', 'roomId')
      .addSelect('COUNT(room.id)', 'cnt')
      .where('user.id=:id', { id: user.id })
      .orWhere('user.id=:id2', { id2: post.userId })
      .groupBy('room.name')
      .having('`cnt`>1')
      .getOne();

    return {
      user: post.user,
      room: roomMember.room,
    };
  }

  async getMyChatList(user) {
    const findRoom = await this.roomMemberRepository.find({
      where: {
        user: user.id,
      },
      relations: {
        room: true,
      },
    });

    const arr = findRoom.map((i) => {
      return { room: i.room };
    });
    const findUserName = await this.roomMemberRepository.find({});
    // const findUserName = await this.roomMemberRepository.find({
    //   where: [
    //     {
    //       user: Not(user.id),
    //     },
    //     ...arr,
    //   ],
    // });
    // await this.roomMemberRepository
    //   .createQueryBuilder('roomMember')
    //   .leftJoin('roomMember.user', 'user')
    //   .leftJoin('roomMember.room', 'room')
    //   .addSelect('user.userId')
    //   .addSelect('room.name')
    //   // .addSelect('roomMember.userId', 'userId')
    //   // .addSelect('roomMember.roomId', 'roomId')
    //   .where('user.id=:id', { id: user.id })
    //   .getMany();

    return findRoom;
  }
}
