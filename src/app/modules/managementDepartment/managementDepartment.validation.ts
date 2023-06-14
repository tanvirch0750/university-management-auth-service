import { z } from 'zod';

export const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Management Department must have a title',
    }),
  }),
});

export const updateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Management Department must have a title',
    }),
  }),
});
