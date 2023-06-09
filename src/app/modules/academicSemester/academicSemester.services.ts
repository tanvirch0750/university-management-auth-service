import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import AcademicSemester from './academicSemesterModel';

const createAcademicSemisterToDB = async (
  semester: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[semester.title] !== semester.code) {
    throw new ApiError('Invalid Semester Code', httpStatus.BAD_REQUEST);
  } else {
    const createdAcademicSemister = await AcademicSemester.create(semester);
    return createdAcademicSemister;
  }
};

const getAllAcademicSemestersFromDB = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericPaginationResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filtersData,
    academicSemesterSearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAcademicSemisterFromDB = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSingleAcademicSemisterToDB = async (
  id: string,
  updatedData: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    updatedData.title &&
    updatedData.code &&
    academicSemesterTitleCodeMapper[updatedData.title] !== updatedData.code
  ) {
    throw new ApiError('Invalid Semester Code', httpStatus.BAD_REQUEST);
  } else {
    const result = await AcademicSemester.findOneAndUpdate(
      { _id: id },
      updatedData,
      { new: true }
    );
    return result;
  }
};

const deleteAcademicSemesterFromDB = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemisterToDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemisterFromDB,
  updateSingleAcademicSemisterToDB,
  deleteAcademicSemesterFromDB,
};
