import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { CreateMessageResultSchema } from "@modelcontextprotocol/sdk/types.js"
import { z } from "zod3"

const server = new McpServer({
  name: "start-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
    prompts: {},
  },
})





async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main()

