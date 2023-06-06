import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemesterModel';

export const createAcademicSemisterToDB = async (
  semester: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[semester.title] !== semester.code) {
    throw new ApiError('Invalid Semester Code', httpStatus.BAD_REQUEST);
  } else {
    const createdAcademicSemister = await AcademicSemester.create(semester);
    return createdAcademicSemister;
  }
};
