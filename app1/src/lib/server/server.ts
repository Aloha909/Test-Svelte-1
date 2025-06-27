// import { handler } from '$root/build/handler.js';
import { createServer, type IncomingMessage, type ServerResponse, type ServerOptions } from 'http';
import { Server as SocketIOServer } from 'socket.io';
// import type { Room } from '$lib/types/room.js';
// import type { Socket } from 'socket.io';
// import { handleSocketError } from '$lib/server/errorHandler';
// import { logger } from '$lib/server/logger';
import type { TaskType } from '$lib/components/task/taskType.ts';

const server = createServer();

const io = new SocketIOServer(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
	socket.on('create_task', ({ task }: { task: TaskType }) => {
		console.log('reçu sur create_task');
		try {
			socket.broadcast.emit('create_task', { task });
		} catch (err) {
			console.error('Error in create_task', err);
		}
	});
	socket.on('delete_task', ({ id }: { id: number }) => {
		console.log('reçu sur delete_task');
		try {
			socket.broadcast.emit('delete_task', { id });
		} catch (err) {
			console.error('Error in delete_task', err);
		}
	});
	socket.on('mark_done', ({ id }: { id: number }) => {
		console.log('reçu sur mark_done');
		try {
			socket.broadcast.emit('mark_done', { id });
		} catch (err) {
			console.error('Error in mark_done', err);
		}
	});
});

server.listen(3000, () => {
	console.log('listening on port 3000');
});

server.on('error', (err) => {
	console.error('Server error:', err);
});
