import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interfaces';
import AcademicDepartment from './academicDepartment.model';

const createAcademicDepartmentToDB = async (
  department: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const createdUser = (await AcademicDepartment.create(department)).populate(
    'academicFaculty'
  );
  return createdUser;
};

const getAllAcademicDepartmentFromDB = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericPaginationResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filtersData,
    academicDepartmentSearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAcademicDepartmentFromDB = async (
  id: string
): Promise<IAcademicDepartment | null | undefined> => {
  const result = (await AcademicDepartment.findById(id))?.populate(
    'academicFaculty'
  );
  return result;
};

const updateSingleAcademicDepartmentToDB = async (
  id: string,
  updatedData: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null | undefined> => {
  const result = (
    await AcademicDepartment.findOneAndUpdate({ _id: id }, updatedData, {
      new: true,
    })
  )?.populate('academicFaculty');

  return result;
};

const deleteAcademicDepartmentFromDB = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentToDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentToDB,
  deleteAcademicDepartmentFromDB,
};
