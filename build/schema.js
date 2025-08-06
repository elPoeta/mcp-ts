import { z } from 'zod3';
export const InputFieldSchema = z.object({
    type: z.union([z.literal('string'), z.literal('number'), z.literal('boolean'), z.literal('object'), z.literal('array')])
});
export const ToolInputSchema = z.object({
    type: z.literal("object"),
    properties: z.record(InputFieldSchema),
    required: z.array(z.string())
});
export function transformZodToJSONSchema(zodSchema) {
    if (zodSchema instanceof z.ZodObject) {
        const properties = {};
        for (const [key, value] of Object.entries(zodSchema.shape)) {
            if (value instanceof z.ZodLiteral) {
                properties[key] = { type: value._def.value };
            }
            else if (value instanceof z.ZodString) {
                properties[key] = { type: 'string' };
            }
            else if (value instanceof z.ZodNumber) {
                properties[key] = { type: 'number' };
            }
            else if (value instanceof z.ZodBoolean) {
                properties[key] = { type: 'boolean' };
            }
            else if (value instanceof z.ZodArray) {
                properties[key] = { type: 'array', items: transformZodToJSONSchema(value.element) };
            }
            else if (value instanceof z.ZodObject) {
                properties[key] = {
                    type: 'object',
                    properties: transformZodToJSONSchema(value)
                };
            }
        }
        return {
            type: 'object',
            properties,
            required: Object.keys(zodSchema.shape)
        };
    }
    throw new Error('Unsupported Zod schema');
}
export const ToolSchema = z.object({
    name: z.string(),
    description: z.string(),
    inputSchema: ToolInputSchema
});
export const ListToolsDefReqSchema = z.object({
    tools: z.array(ToolSchema)
});
//const jsonSchema = transformZodToJSONSchema(ToolInputSchemaSchema);
//console.log(JSON.stringify(jsonSchema, null, 2));
/*
 const ListToolsRequestSchema = z.object({});

const ToolInputSchemaSchema = z.object({
  type: z.literal("object"),
  properties: z.record(
    z.object({
      type: z.union([
    z.literal("string"),
    z.literal("number"),
    z.literal("boolean"),
    z.literal("object"),
    z.literal("array")
      ])
    })
  ),
  required: z.array(z.string())
});


const ToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  inputSchema: ToolInputSchemaSchema
});


const ListToolsResponseSchema = z.object({
  tools: z.array(ToolSchema)
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  const tools = [
    {
      name: "calculate_sum",
      description: "Add two numbers together",
      inputSchema: {
    type: "object",
    properties: {
      a: { type: "number" },
      b: { type: "number" }
    },
    required: ["a", "b"]
      }
    },
    {
      name: "echo_text",
      description: "Returns the same text",
      inputSchema: {
    type: "object",
    properties: {
      text: { type: "string" }
    },
    required: ["text"]
      }
    }
  ];

  
  return ListToolsResponseSchema.parse({ tools });
});

type Tool = z.infer<typeof ToolSchema>;
type ListToolsResponse = z.infer<typeof ListToolsResponseSchema>;

 */
