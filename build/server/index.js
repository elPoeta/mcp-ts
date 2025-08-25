import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getPackageJson } from './api.js';
//import { ServerContext } from '../types/context.js';
import { MCP_HANDLERS, MCP_TOOLS, } from '../tools/index.js';
import { handleToolError } from './errors.js';
export const createMcpServer = () => {
    const server = new McpServer({
        name: 'mcp-server',
        version: getPackageJson().version,
    }, {
        capabilities: {
            tools: {},
            resources: {},
        },
    });
    MCP_TOOLS.forEach((tool) => {
        const handler = MCP_HANDLERS[tool.name];
        if (!handler) {
            throw new Error(`Handler for tool ${tool.name} not found`);
        }
        const toolHandler = handler;
        server.tool(tool.name, tool.description, { params: tool.inputSchema }, async (args, extra) => {
            const properties = { tool_name: tool.name };
            const extraArgs = {
                ...extra,
            };
            try {
                return await toolHandler(args, extraArgs);
            }
            catch (error) {
                return handleToolError(error, properties);
            }
        });
    });
    server.server.onerror = (error) => {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error(message);
    };
    return server;
};
