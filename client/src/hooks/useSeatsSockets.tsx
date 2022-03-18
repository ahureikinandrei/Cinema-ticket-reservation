import { useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { io, Socket } from 'socket.io-client';
import { WS_BASE_URL } from '../constants/baseUrl';

const UseSeatsSockets = (): void => {
    const socket = useRef<Socket>();
    useEffect(() => {
        socket.current = io(WS_BASE_URL);
        const message = {
            event: 'message',
            payload: 'hi',
        };
        socket.current.send(JSON.stringify(message));
    }, []);
};

export default UseSeatsSockets;
