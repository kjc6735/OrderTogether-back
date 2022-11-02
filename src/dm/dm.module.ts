import { RoomMember } from './../entities/roomMember.entity';
import { EventsModule } from './../events/dm.event.module';
import { DM } from './../entities/dm.entity';
import { Room } from './../entities/room.entity';
import { User } from './../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DmService } from './dm.service';
import { DmController } from './dm.controller';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([User, Room, DM, RoomMember]),
  ],
  providers: [DmService],
  controllers: [DmController],
})
export class DmModule {}
