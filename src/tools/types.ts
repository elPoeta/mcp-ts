import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
import { MCP_TOOLS } from './definitions.js';

// Extract the tool names as a union type
type McpToolName = (typeof MCP_TOOLS)[number]['name'];

export type ToolParams<T extends McpToolName> = Extract<
	(typeof MCP_TOOLS)[number],
	{ name: T }
>['inputSchema'];

export type ToolHandler<T extends McpToolName> = ToolCallback<{
	params: ToolParams<T>;
}>;

export type ToolHandlerExtraParams = Parameters<
	ToolHandler<McpToolName>
>['1'];

export type ToolHandlerExtended<T extends McpToolName> = (
	...args: [
		args: Parameters<ToolHandler<T>>['0'],
		extra: ToolHandlerExtraParams,
	]
) => ReturnType<ToolHandler<T>>;

// Create a type for the tool handlers that directly maps each tool to its appropriate input schema
export type ToolHandlers = {
	[K in McpToolName]: ToolHandlerExtended<K>;
};
