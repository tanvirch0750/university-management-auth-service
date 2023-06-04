import { MongoError } from 'mongodb';
import ApiError from './ApiError';

export const handleDuplicateFieldsErrorDB = (err: MongoError) => {
  const regex = /"(.*?)"/g;
  const val = err?.errmsg?.match(regex)?.[0];

  if (val) {
    const message = `Duplicate filed value ${val}. Please use another value`;
    return new ApiError(message, 400);
  }

  return null;
};
