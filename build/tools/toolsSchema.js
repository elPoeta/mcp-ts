import { z } from 'zod3';
export const addInputSchema = z.object({
    a: z.number().describe('First number to add'),
    b: z.number().describe('Second number to add'),
});
