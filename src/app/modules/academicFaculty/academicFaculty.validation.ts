import { z } from 'zod';

export const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic Faculty must have a title',
    }),
  }),
});

export const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic Faculty must have a title',
    }),
  }),
});
