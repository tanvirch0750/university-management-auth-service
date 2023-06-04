import mongoose from 'mongoose';
import { IGenereicErrorMessage } from '../interfaces/error';
import ApiError from './ApiError';

export const handleValidationErrorDB = (
  err: mongoose.Error.ValidationError
) => {
  const errorsMsg = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => el.message
  );

  const errorsObj: IGenereicErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      };
    }
  );

  const message = `Invalid input data. ${errorsMsg.join('. ')}`;
  return new ApiError(message, 400, errorsObj);
};
