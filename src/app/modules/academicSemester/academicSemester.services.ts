import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
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

export const getAllAcademicSemestersFromDB = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericPaginationResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // const result = await AcademicSemester.find({})
  //   .sort(sortConditions)
  //   .skip(skip)
  //   .limit(limit);
  let query = AcademicSemester.find();
  if (andConditions.length > 0) query = query.and(andConditions);
  query = query.sort(sortConditions).skip(skip).limit(limit);
  const result = await query.exec();
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
