import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class SeatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SeatsGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): string {
    this.server.emit('msgToClient', payload);
    return 'Hello world!';
  }

  afterInit(server: Server): string {
    this.logger.log('Initialized!');
    return 'Init!';
  }

  handleDisconnect(client: Socket) {
    return 'Client disconnected';
  }

  handleConnection(client: Socket) {
    return 'Client connected';
  }
}
