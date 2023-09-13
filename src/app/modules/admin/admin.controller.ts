import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import { AdminServices } from './admin.services';

const getAllAdmins: RequestHandler = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminServices.getAllAdminFromDB(
    filters,
    paginationOptions
  );

  if (result.data.length === 0) {
    return next(new ApiError('No Admin found!', httpStatus.NOT_FOUND));
  }

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Admin retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await AdminServices.getSingleAdminFromDB(id);

  if (!result) {
    return next(
      new ApiError(`No admin found with this ${id} id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Admin retrived successfully',
    data: result,
  });
});

const updateAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AdminServices.updateAdminToDB(id, updatedData);

  if (!result) {
    return next(new ApiError(`No admin found with this ID`, 404));
  }

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const result = await AdminServices.deleteAdminFromDB(id);

  if (!result) {
    return next(
      new ApiError(`No admin found with this ${id} id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Admin deleted successfully !',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
