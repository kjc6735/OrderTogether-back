import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const rooms = {};

@WebSocketGateway({ namespace: 'chat' })
export class EventsGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer() public server: Server;
  private readonly logger = new Logger('socket server');

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  handleConnection(@ConnectedSocket() socket: Socket) {}
  afterInit(server: any) {}
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnected: ', socket.nsp.name);
    const newNamespace = socket.nsp;
    delete rooms[socket.nsp.name][socket.id];

    //zerocho code
    //newNamespace.emit('onlineList', Object.values(onlineMap[socket.nsp.name]));
  }
}
