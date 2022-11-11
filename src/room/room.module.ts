import { Post } from './../entities/post.entity';
import { RoomMember } from './../entities/roomMember.entity';
import { Room } from './../entities/room.entity';
import { User } from './../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, RoomMember, Room, Post])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
