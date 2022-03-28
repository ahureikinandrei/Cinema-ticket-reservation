import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookedSeat, BookedSeatDocument } from './schemas/booking.schema';
import { Model } from 'mongoose';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(BookedSeat.name)
    private bookedSeatModel: Model<BookedSeatDocument>,
  ) {}

  create(socketID: string, room: string) {
    try {
      this.bookedSeatModel.create({
        socketID,
        sessionID: room,
        bookedSeats: [],
        createdDate: new Date(),
      });
    } catch (e) {
      throw new WsException('Session not found');
    }
  }

  async addSeatToClient(socketID: string, seatID: string) {
    const client = await this.bookedSeatModel.findOne({ socketID });
    if (!client) {
      return;
    }
    client.bookedSeats.push(seatID);
    return await client.save();
  }

  async removeSeatFromClient(socketID: string, seatID: string) {
    const client = await this.bookedSeatModel.findOne({ socketID });
    if (!client) {
      return new WsException('Client not found');
    }
    client.bookedSeats.pull(seatID);
    return await client.save();
  }

  async setIsProcessBuyingOfSocket(socketID: string) {
    await this.bookedSeatModel.findOneAndUpdate(
      { socketID },
      { isProcessBuying: true },
    );
  }

  async deleteBySocketID(socketID: string) {
    await this.bookedSeatModel.findOneAndDelete({ socketID });
  }

  async deleteSocketInfoNotInBuyingProcess(socketID: string) {
    await this.bookedSeatModel.findOneAndDelete({
      socketID,
      isProcessBuying: false,
    });
  }

  async getInfoByAllUserInRoom(session: string) {
    return await this.bookedSeatModel.find({
      sessionID: session,
    });
  }

  async getSeatsBookedByAllUsers(session: string) {
    const otherUsers = await this.bookedSeatModel.find({
      sessionID: session,
    });

    return otherUsers.reduce((prev, curr) => {
      return [...prev, ...curr.bookedSeats];
    }, []);
  }

  async getSeatsBookedByOtherUsers(clientID: string, session: string) {
    const otherUsers = await this.bookedSeatModel.find({
      sessionID: session,
      socketID: { $ne: clientID },
    });

    return otherUsers.reduce((prev, curr) => {
      return [...prev, ...curr.bookedSeats];
    }, []);
  }

  filterSeatsByClientId(
    allClientsInfoInRoom: BookedSeatDocument[],
    clientID: string,
  ) {
    return allClientsInfoInRoom.reduce((prev, curr) => {
      if (curr.socketID !== clientID) {
        return [...prev, ...curr.bookedSeats];
      }
      return prev;
    }, []);
  }
}
