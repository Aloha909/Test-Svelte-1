import { PUBLIC_SERVER_URL } from '$env/static/public';
import { io, type Socket } from 'socket.io-client';

export const socket: Socket = io(PUBLIC_SERVER_URL, {
	autoConnect: true
});
