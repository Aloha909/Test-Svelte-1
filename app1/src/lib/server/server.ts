import { handler } from '$root/build/handler.js';
import { createServer, type IncomingMessage, type ServerResponse, type ServerOptions } from 'http';
import { Server as SocketIOServer } from 'socket.io';
// import type { Room } from '$lib/types/room.js';
// import type { Socket } from 'socket.io';
// import { handleSocketError } from '$lib/server/errorHandler';
// import { logger } from '$lib/server/logger';
import { TaskType } from '$lib/components/task/taskType';

const server = createServer(
	handler as ServerOptions<typeof IncomingMessage, typeof ServerResponse>
);

const io = new SocketIOServer(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
	socket.on('create_task', ({ task: TaskType }) => {
		try {
			io.broadcast.emit('create_task');
		} catch (err) {
			console.error('Error in create_task', err);
		}
	});
});

server.listen(3000, () => {
	console.log('listening on port 3000');
});
