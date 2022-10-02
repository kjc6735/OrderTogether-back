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
  @WebSocketServer() public server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('login')
  login(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { chatList: string[] },
  ) {
    data.chatList.forEach((element) => {
      console.log(`socket join ${socket.nsp.name} ${element}`);
      console.log(`socket id : ${socket.id}`);
      socket.join(element);
    });
  }
  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log('connected socket: ', socket.nsp.name);
  }
  afterInit(server: any) {
    console.log('after init');
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`disconnected socket ${socket.nsp.name} ${socket.id}`);
  }
}
