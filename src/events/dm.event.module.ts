import { DmGateway } from './dm.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [DmGateway],
  exports: [DmGateway],
})
export class EventsModule {}
