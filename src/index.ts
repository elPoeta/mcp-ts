import { createMcpServer } from './server/index.js';
import { startStdio } from './transports/stdio.js';


try {
	const server = createMcpServer();
	await startStdio(server);
} catch (error) {
	console.error('Server error:', error);

	process.exit(1);
}
