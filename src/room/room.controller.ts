import { RoomService } from './room.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '..//decorators/user.decorator';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get()
  getMyRoom(@User() user) {
    this.roomService.getMyRoom(user);
  }

  @Post()
  createRoom(@User() user, @Body('postId') postId: number) {
    return this.roomService.createRoomByPostId(user, postId);
  }

  @Get('/mychat')
  getMyChatList(@User() user) {
    return this.roomService.getMyChatList(user);
  }
}
