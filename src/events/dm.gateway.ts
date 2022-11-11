import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, { namespace: 'dm' })
export class DmGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
    console.log(`socket nsp is ${socket.nsp.name} socket.id : ${socket.id}`);
  }

  @WebSocketServer() public server: Server;

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() socket: Server, @MessageBody() data) {
    const { roomId, input } = data;
    console.log(data);
    socket.to(roomId).emit('message', input);
  }

  @SubscribeMessage('join')
  joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    socket.join(data.roomId);
    socket.emit('message', data);
  }

  @SubscribeMessage('login')
  login(@ConnectedSocket() socket: Socket) {
    socket.join('test');
    console.log(socket.id);
  }

  afterInit(server: any) {
    console.log('after init');
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`disconnected socket ${socket.nsp.name} ${socket.id}`);
  }
}
