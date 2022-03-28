import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SeatsSocketEvents } from './types';
import { BookingService } from './booking.service';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@WebSocketGateway({ cors: true })
export class BookingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private bookingService: BookingService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(SeatsSocketEvents.BOOK_SEAT)
  async handleBookSeatMessage(client: Socket, seatID: string): Promise<void> {
    const room = client.handshake.auth.session;
    if (!room) {
      throw new WsException('Session not found');
    }

    await this.bookingService.addSeatToClient(client.id, seatID);
    const allClientsInfoInRoom =
      await this.bookingService.getInfoByAllUserInRoom(room);
    const setClientsInRoom = this.server.sockets.adapter.rooms.get(room);

    setClientsInRoom.forEach((clientId) => {
      const bookedSeat = this.bookingService.filterSeatsByClientId(
        allClientsInfoInRoom,
        clientId,
      );

      this.server.to(clientId).emit(SeatsSocketEvents.BOOK_SEAT, bookedSeat);
    });
  }

  @SubscribeMessage(SeatsSocketEvents.CANSEL_BOOK_SEAT)
  async handleCanselBookSeatMessage(
    client: Socket,
    seatID: string,
  ): Promise<void> {
    const room = client.handshake.auth.session;
    if (!room) {
      throw new WsException('Session not found');
    }

    await this.bookingService.removeSeatFromClient(client.id, seatID);
    const allClientsInfoInRoom =
      await this.bookingService.getInfoByAllUserInRoom(room);

    const setClientsInRoom = this.server.sockets.adapter.rooms.get(room);
    setClientsInRoom.forEach((clientId) => {
      const bookedSeat = this.bookingService.filterSeatsByClientId(
        allClientsInfoInRoom,
        clientId,
      );

      this.server
        .to(clientId)
        .emit(SeatsSocketEvents.CANSEL_BOOK_SEAT, bookedSeat);
    });
  }

  @SubscribeMessage(SeatsSocketEvents.REDIRECT_ON_BYE_PAGE)
  async handleUserRedirectedToByePage(client: Socket) {
    const room = client.handshake.auth.session;
    if (!room) {
      throw new WsException('Session not found');
    }

    await this.bookingService.setIsProcessBuyingOfSocket(client.id);

    setTimeout(async () => {
      this.bookingService.deleteBySocketID(client.id);
      const bookedSeat = await this.bookingService.getSeatsBookedByOtherUsers(
        client.id,
        room,
      );

      this.server.to(room).emit(SeatsSocketEvents.CANSEL_BOOK_SEAT, bookedSeat);
    }, 10000);
  }

  @SubscribeMessage(SeatsSocketEvents.LEAVE_SESSION)
  async handleUserLeftSessionPage(client: Socket) {
    const room = client.handshake.auth.session;
    if (!room) {
      throw new WsException('Session not found');
    }
    await this.bookingService.deleteBySocketID(client.id);
    const bookedSeat = await this.bookingService.getSeatsBookedByOtherUsers(
      client.id,
      room,
    );

    client.to(room).emit(SeatsSocketEvents.CANSEL_BOOK_SEAT, bookedSeat);
  }

  handleDisconnect(client: Socket): void {
    this.bookingService.deleteSocketInfoNotInBuyingProcess(client.id);
  }

  async handleConnection(client: Socket): Promise<void> {
    const room = client.handshake.auth.session;
    if (!room) {
      throw new WsException('Session not found');
    }

    client.join(room);

    await this.bookingService.create(client.id, room);
    const bookedSeat = await this.bookingService.getSeatsBookedByOtherUsers(
      client.id,
      room,
    );

    client.emit(SeatsSocketEvents.CONNECT, bookedSeat);
  }

  @Cron('0 0 * * * *')
  async clearBookingDatabaseDeadConnection() {
    const sockets = await this.server.fetchSockets();
    const currentConnectionsSocketsID = sockets.map(({ id }) => {
      if (id) {
        return id;
      }
    });

    this.bookingService.clearBookingDatabaseDeadConnection(
      currentConnectionsSocketsID,
    );
  }
}
