import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyCreatedEvent,
  IAcademicFacultyFilters,
  IAcademicFacultyUpdatedEvent,
} from './academicFaculty.interfaces';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFacultyToDB = async (
  faculty: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const createdUser = await AcademicFaculty.create(faculty);
  return createdUser;
};

const getAllAcademicFacultiesFromDB = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericPaginationResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filtersData,
    academicFacultySearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAcademicFacultyFromDB = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateSingleAcademicFacultyToDB = async (
  id: string,
  updatedData: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true }
  );

  return result;
};

const deleteAcademicFacultyFromDB = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

const insertIntoDBFromEvent = async (
  e: IAcademicFacultyCreatedEvent
): Promise<void> => {
  await AcademicFaculty.create({
    syncId: e.id,
    title: e.title,
  });
};

const updateOneInDBFromEvent = async (
  e: IAcademicFacultyUpdatedEvent
): Promise<void> => {
  await AcademicFaculty.findOneAndUpdate(
    { syncId: e.id },
    {
      $set: {
        title: e.title,
      },
    }
  );
};

const deleteOneFromDBFromEvent = async (syncId: string): Promise<void> => {
  await AcademicFaculty.findOneAndDelete({ syncId });
};

export const AcademicFacultyServices = {
  createAcademicFacultyToDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateSingleAcademicFacultyToDB,
  deleteAcademicFacultyFromDB,
  insertIntoDBFromEvent,
  updateOneInDBFromEvent,
  deleteOneFromDBFromEvent,
};
