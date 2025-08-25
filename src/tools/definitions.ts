import { addInputSchema } from './toolsSchema.js'

export const MCP_TOOLS = [
	{
		name: 'add_numbers' as const,
		description: `Add two numbers`,
		inputSchema: addInputSchema,
	},
];
