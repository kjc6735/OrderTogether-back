import { DmService } from './dm.service';
import { Body, Controller, Get, Injectable, Param, Post } from '@nestjs/common';
import { User } from '../decorators/user.decorator';

@Controller('/room')
export class DmController {
  constructor(private readonly dmService: DmService) {}
  // @Get('/:roomId/dm')
  // dmList() {
  //   return this.dmService.getDmList();
  // }
  // @Post('/:roomId/dm')
  // createDM() {
  //   return this.dmService.createDM();
  // }
  @Get('/:roomId/dm')
  getDM(@User() user, @Param('roomId') roomId) {
    return this.dmService.getDM(user, roomId);
  }
  @Post('/:roomId/dm')
  createPost(@User() user, @Param('roomId') roomId, @Body('message') message) {
    return this.dmService.createDM(user, roomId, message);
  }
}
