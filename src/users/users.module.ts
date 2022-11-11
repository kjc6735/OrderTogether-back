import { RoomMember } from './../entities/roomMember.entity';
import { Room } from './../entities/room.entity';
import { EventsModule } from '../events/dm.event.module';
import { User } from './../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Room, RoomMember])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
