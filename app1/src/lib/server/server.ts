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
	console.log('bien connecte');

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
	socket.on('test', () => {
		console.log('reçu sur test');
		try {
			socket.broadcast.emit('test');
		} catch (err) {
			console.error('Error in test', err);
		}
	});
});

const port = process.env.PORT || 3000;

const app = server.listen(port, '0.0.0.0', () => {
	console.log(`listening on port ${port}`);
});

if (app) {
	console.log('=)');
} else {
	console.log('=(');
}

server.on('error', (err) => {
	console.error('Server error:', err);
});
