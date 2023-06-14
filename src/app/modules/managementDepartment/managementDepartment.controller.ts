import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartmentServices } from './managementDepartment.services';

const createManagementDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const mngDpt = req.body;
    const result =
      await ManagementDepartmentServices.createManagementDepartmentToDB(mngDpt);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Management Department created successfully',
      data: result,
    });
  }
);

const getAllManagementDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result =
      await ManagementDepartmentServices.getAllManagementDepartmentFromDB(
        filters,
        paginationOptions
      );

    if (result.data.length === 0) {
      return next(
        new ApiError('No Management Department found!', httpStatus.NOT_FOUND)
      );
    }

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Management Department retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleManagementDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentServices.getSingleManagementDepartmentFromDB(
        id
      );

    if (!result) {
      return next(
        new ApiError(
          `No Management Department found with this ${id} id`,
          httpStatus.NOT_FOUND
        )
      );
    }

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Management Department retrived successfully',
      data: result,
    });
  }
);

const updateManagementDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result =
      await ManagementDepartmentServices.updateManagementDepartmentToDB(
        id,
        updatedData
      );

    if (!result) {
      return next(
        new ApiError(`No Management Department found with this ID`, 404)
      );
    }

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Management Department updated successfully',
      data: result,
    });
  }
);

const deleteManagementDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;

    const result =
      await ManagementDepartmentServices.deleteManagementDepartmentFromDB(id);

    if (!result) {
      return next(
        new ApiError(
          `No Management Department found with this ${id} id`,
          httpStatus.NOT_FOUND
        )
      );
    }

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Management Department deleted successfully !',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
