import { CastError } from 'mongoose';
import ApiError from './ApiError';

export const handleCastErrorDB = (err: CastError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new ApiError(message, 400);
};
