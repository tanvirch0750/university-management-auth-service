import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { managementDepartmentSearchableFields } from './managementDepartment.constant';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface';
import ManagementDepartment from './managementDepartment.model';

const createManagementDepartmentToDB = async (
  managementDpt: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(managementDpt);
  return result;
};

const getAllManagementDepartmentFromDB = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericPaginationResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filtersData,
    managementDepartmentSearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleManagementDepartmentFromDB = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

const updateManagementDepartmentToDB = async (
  id: string,
  updatedData: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true }
  );

  return result;
};

const deleteManagementDepartmentFromDB = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  return result;
};

export const ManagementDepartmentServices = {
  createManagementDepartmentToDB,
  getAllManagementDepartmentFromDB,
  getSingleManagementDepartmentFromDB,
  deleteManagementDepartmentFromDB,
  updateManagementDepartmentToDB,
};
