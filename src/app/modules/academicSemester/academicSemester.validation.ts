import { z } from 'zod';
import {
  academeicSemesterMonths,
  academicSemeseterCode,
  academicSemesterTitle,
} from './academicSemester.constant';

export const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string, ...string[]], {
      required_error: 'Academic Semester must have a title',
    }),
    year: z.string({
      required_error: 'Academic Semester must have a year',
    }),
    code: z.enum([...academicSemeseterCode] as [string, ...string[]], {
      required_error: 'Academic Semester must have a code',
    }),
    startMonth: z.enum([...academeicSemesterMonths] as [string, ...string[]], {
      required_error: 'Academic Semester must have a start month',
    }),
    endMonth: z.enum([...academeicSemesterMonths] as [string, ...string[]], {
      required_error: 'Academic Semester must have an end month',
    }),
  }),
});

export const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitle] as [string, ...string[]], {
          required_error: 'Academic Semester must have a title',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Academic Semester must have a year',
        })
        .optional(),
      code: z
        .enum([...academicSemeseterCode] as [string, ...string[]], {
          required_error: 'Academic Semester must have a code',
        })
        .optional(),
      startMonth: z
        .enum([...academeicSemesterMonths] as [string, ...string[]], {
          required_error: 'Academic Semester must have a start month',
        })
        .optional(),
      endMonth: z
        .enum([...academeicSemesterMonths] as [string, ...string[]], {
          required_error: 'Academic Semester must have an end month',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );
