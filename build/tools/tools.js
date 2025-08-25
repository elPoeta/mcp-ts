async function addNumbers({ a, b }) {
    return a + b;
}
export const MCP_HANDLERS = {
    add_numbers: async ({ params }) => {
        const result = await addNumbers(params);
        return { content: [{ type: "text", text: String(result) }] };
    }
};
