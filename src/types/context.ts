import { Environment } from '../constants.js';

export type AppContext = {
	name: string;
	transport: 'sse' | 'stdio' | 'stream';
	environment: Environment;
	version: string;
};

export type ServerContext = {
	app: AppContext;
};
