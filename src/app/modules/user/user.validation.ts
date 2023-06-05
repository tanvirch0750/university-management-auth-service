import { z } from 'zod';

export const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'An user must have a Role',
    }),
    password: z.string().optional(),
  }),
});
