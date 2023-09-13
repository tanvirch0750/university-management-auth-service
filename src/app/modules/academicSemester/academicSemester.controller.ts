import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academeicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const academicSemester = req.body;
  const result = await AcademicSemesterServices.createAcademicSemisterToDB(
    academicSemester
  );

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAllAcademicSemesters: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, academeicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB(
      filters,
      paginationOptions
    );

    if (result.data.length === 0) {
      return next(new ApiError('No semesters found!', httpStatus.NOT_FOUND));
    }

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Semesters retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAcademicSemesters: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const result =
      await AcademicSemesterServices.getSingleAcademicSemisterFromDB(id);

    if (!result) {
      return next(
        new ApiError(
          `No semesters found with this ${id} id`,
          httpStatus.NOT_FOUND
        )
      );
    }

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Semester retrived successfully',
      data: result,
    });
  }
);

const updateAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result =
      await AcademicSemesterServices.updateSingleAcademicSemisterToDB(
        id,
        updatedData
      );

    if (!result) {
      return next(new ApiError(`No Semester found with this ID`, 404));
    }

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Semester updated successfully',
      data: result,
    });
  }
);

const deleteAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;

    const result = await AcademicSemesterServices.deleteAcademicSemesterFromDB(
      id
    );

    if (!result) {
      return next(
        new ApiError(
          `No semesters found with this ${id} id`,
          httpStatus.NOT_FOUND
        )
      );
    }

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Semester deleted successfully !',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemesters,
  updateAcademicSemester,
  deleteAcademicSemester,
};
