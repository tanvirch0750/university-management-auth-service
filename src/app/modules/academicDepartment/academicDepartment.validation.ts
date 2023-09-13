import { z } from 'zod';

export const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic Department must have a title',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
    }),
  }),
});

export const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});
