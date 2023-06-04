import { NextFunction, Request, Response } from 'express';
import config from '../config';
import ApiError from '../errors/ApiError';
import { handleCastErrorDB } from '../errors/handleCastErrorDB';
import { handleDuplicateFieldsErrorDB } from '../errors/handleDuplicateFieldsErrorDB';
import { handleValidationErrorDB } from '../errors/handleValidationErroDB';
import { errorLogger } from '../shared/logger';

const sendErrorToDev = (err: ApiError, res: Response) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    errorMessages: err.errorMessages
      ? err.errorMessages
      : [{ path: '', message: err.message }],
    stack: err?.stack,
    error: err,
  });
};

const sendErrorToProd = (err: ApiError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      errorMessages: err.errorMessages
        ? err.errorMessages
        : [{ path: '', message: err.message }],
    });
  } else {
    // log the error
    errorLogger.error(`🛑 ERROR`, err);

    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.env === 'development') {
    sendErrorToDev(err, res);
  } else if (config.env === 'production') {
    let error = { ...err };

    if (err?.name === 'CastError') error = handleCastErrorDB(error);
    if (err?.code === 11000) error = handleDuplicateFieldsErrorDB(error);
    if (err?.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }

    sendErrorToProd(error, res);
  }

  next();
};

export default globalErrorHandler;
