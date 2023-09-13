import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academeicFacultyFilterableFields } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interfaces';
import { AcademicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const faculty = req.body;
  const result = await AcademicFacultyServices.createAcademicFacultyToDB(
    faculty
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Academic faculty created successfully',
    data: result,
  });
});

const getAllAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, academeicFacultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB(
      filters,
      paginationOptions
    );

    if (result.data.length === 0) {
      return next(new ApiError('No faculties found!', httpStatus.NOT_FOUND));
    }

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Faculty retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(
      id
    );

    if (!result) {
      return next(
        new ApiError(
          `No faculty found with this ${id} id`,
          httpStatus.NOT_FOUND
        )
      );
    }

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Faculty retrived successfully',
      data: result,
    });
  }
);

const updateAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result =
      await AcademicFacultyServices.updateSingleAcademicFacultyToDB(
        id,
        updatedData
      );

    if (!result) {
      return next(new ApiError(`No faculty found with this ID`, 404));
    }

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Faculty updated successfully',
      data: result,
    });
  }
);

const deleteAcademicFeculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;

    const result = await AcademicFacultyServices.deleteAcademicFacultyFromDB(
      id
    );

    if (!result) {
      return next(
        new ApiError(
          `No faculty found with this ${id} id`,
          httpStatus.NOT_FOUND
        )
      );
    }

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Faculty deleted successfully !',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFeculty,
};
