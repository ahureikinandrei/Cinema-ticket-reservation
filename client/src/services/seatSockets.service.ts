// eslint-disable-next-line import/no-extraneous-dependencies
import { io, Socket } from 'socket.io-client';
import React from 'react';
import { WS_BASE_URL } from '../constants/baseUrl';
import { ISeatFullInfo } from '../redux/order/reducer';

export enum SeatsSocketEvents {
    CONNECT = 'connection',
    BOOK_SEAT = 'bookSeat',
    CANSEL_BOOK_SEAT = 'canselBookSeat',
    REDIRECT_ON_BYE_PAGE = 'redirectToByePage',
    LEAVE_SESSION = 'leftSessionPage',
}

type cbType = React.Dispatch<React.SetStateAction<string[]>> | null;

export class SeatSocketsService {
    private socket: Socket | null = null;

    readonly session: string;

    private cb: cbType = null;

    constructor(session: string) {
        this.session = session;
        this._createSocket(session);
    }

    _createSocket(session: string): void {
        this.socket = io(WS_BASE_URL, {
            auth: {
                session,
            },
        });
    }

    listenMessageFromServer(
        listener: React.Dispatch<React.SetStateAction<string[]>>
    ): void {
        if (!this.socket) {
            return;
        }

        this.cb = listener;

        this.socket.on(SeatsSocketEvents.CONNECT, this.cb);
        this.socket.on(SeatsSocketEvents.BOOK_SEAT, this.cb);
        this.socket.on(SeatsSocketEvents.CANSEL_BOOK_SEAT, this.cb);
    }

    sendBookedSeatInfoToServer(seat: ISeatFullInfo): void {
        if (!this.socket) {
            return;
        }

        this.socket.emit(SeatsSocketEvents.BOOK_SEAT, seat._id);
    }

    sendUnBookedSeatInfoToServer(seat: ISeatFullInfo): void {
        if (!this.socket) {
            return;
        }

        this.socket.emit(SeatsSocketEvents.CANSEL_BOOK_SEAT, seat._id);
    }

    disconnect(
        disconnectReason: SeatsSocketEvents = SeatsSocketEvents.BOOK_SEAT
    ): void {
        if (!this.socket || !this.cb) {
            return;
        }
        this.socket.emit(disconnectReason);
        this.socket.off(SeatsSocketEvents.CONNECT, this.cb);
        this.socket.off(SeatsSocketEvents.BOOK_SEAT, this.cb);
        this.socket.off(SeatsSocketEvents.CANSEL_BOOK_SEAT, this.cb);
        this.socket.close();
        this.socket = null;
        this.cb = null;
    }
}
