import { z } from 'zod3';

type ZodObjectParams<T> = z.ZodObject<{ [key in keyof T]: z.ZodType<T[key]> }>;


export const addInputSchema = z.object({
	a: z.number().describe('First number to add'),
	b: z.number().describe('Second number to add'),

})

