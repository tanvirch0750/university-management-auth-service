import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { adminSearchableFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdminFromDB = async (
  filters: IAdminFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericPaginationResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filtersData,
    adminSearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Admin.find(whereConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdminFromDB = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id }).populate('managementDepartment');
  return result;
};

const updateAdminToDB = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError('Admin not found !', httpStatus.NOT_FOUND);
  }

  const { name, ...adminData } = payload;

  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  // dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete(id).populate(
    'managementDepartment'
  );
  return result;
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminToDB,
  deleteAdminFromDB,
};
