import httpStatus from 'http-status';
import { CastError } from 'mongoose';
import ApiError from './ApiError';

export const handleCastErrorDB = (err: CastError) => {
  const errorObj = [
    {
      path: err.path,
      message: `No semesters found with this ${err.value} id`,
    },
  ];
  const message = `Invalid Id`;
  return new ApiError(message, httpStatus.NOT_FOUND, errorObj);
};
