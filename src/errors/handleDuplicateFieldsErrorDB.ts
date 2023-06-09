import ApiError from './ApiError';

export const handleDuplicateFieldsErrorDB = () => {
  // const regex = /"(.*?)"/g;
  // const val = err?.errmsg?.match(regex)?.[0];
  return new ApiError('Duplicate filed Value', 400);
};
