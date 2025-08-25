import { ToolHandlers } from './types.js'

async function addNumbers({ a, b }: { a: number; b: number }) {
	return a + b;
}

export const MCP_HANDLERS = {
	add_numbers: async ({ params }) => {
		const result = await addNumbers(params);
		return { content: [{ type: "text", text: String(result) }] };
	}

} satisfies ToolHandlers;
