import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError, } from "@modelcontextprotocol/sdk/types.js";
import { ListToolsDefReqSchema } from './schema.js';
const server = new Server({
    name: "mcp-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {}
    }
});
const exampleDefTool = {
    name: "example",
    description: "Example Tool desc.",
    inputSchema: {
        type: "object",
        properties: {
            a: { type: "number" },
            b: { type: "number" }
        },
        required: ["a", "b"]
    }
};
server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = [exampleDefTool];
    return ListToolsDefReqSchema.parse({ tools });
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    switch (name) {
        case "example":
            const { a, b } = args;
            return { content: [{ type: "text", text: JSON.stringify(a + b) }] };
        default:
            throw new McpError(ErrorCode.MethodNotFound, "Tool not found");
    }
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("MCP server is running...");
}
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
