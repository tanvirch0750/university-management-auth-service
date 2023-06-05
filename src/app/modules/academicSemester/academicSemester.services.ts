import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemesterModel';

export const createAcademicSemisterToDB = async (
  semester: IAcademicSemester
): Promise<IAcademicSemester> => {
  const createdAcademicSemister = await AcademicSemester.create(semester);

  return createdAcademicSemister;
};
