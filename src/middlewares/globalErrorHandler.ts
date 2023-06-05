import { ErrorRequestHandler, Response } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import ApiError from '../errors/ApiError';
import { handleCastErrorDB } from '../errors/handleCastErrorDB';
import { handleDuplicateFieldsErrorDB } from '../errors/handleDuplicateFieldsErrorDB';
import { handleValidationErrorDB } from '../errors/handleValidationErroDB';
import { handleZodError } from '../errors/handleZodError';
import { errorLogger } from '../shared/logger';

const sendErrorToDev = (err: ApiError, res: Response) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    errorMessages: err.errorMessages,
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
      errorMessages: err.errorMessages,
    });
  } else {
    // log the error
    errorLogger.error(`🛑 Production ERROR`, err);

    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Something went wrong',
      errorMessages: [],
    });
  }
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (config.env === 'development') {
    // eslint-disable-next-line no-console
    console.log('🚀 globalErrorHandler ~~ ', err);
  } else {
    errorLogger.error('🚀 globalErrorHandler ~~ ', err);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.env === 'development') {
    let error = { ...err };

    if (err instanceof ZodError) {
      error = handleZodError(error);
    }

    if (err instanceof ApiError) {
      sendErrorToDev(err, res);
    } else if (err instanceof Error) {
      sendErrorToDev(error, res);
    } else if (err instanceof ZodError) {
      sendErrorToDev(error, res);
    }
  } else if (config.env === 'production') {
    let error = { ...err };

    if (err instanceof ZodError) {
      error = handleZodError(error);
    }
    if (err?.name === 'CastError') error = handleCastErrorDB(error);
    if (err?.code === 11000) error = handleDuplicateFieldsErrorDB(error);
    if (err?.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }

    if (err instanceof ApiError) {
      sendErrorToProd(err, res);
    } else if (err instanceof Error) {
      sendErrorToProd(error, res);
    } else if (err instanceof ZodError) {
      sendErrorToDev(error, res);
    }
  }

  next();
};

export default globalErrorHandler;
