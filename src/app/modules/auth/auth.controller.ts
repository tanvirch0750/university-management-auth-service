import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthServices } from './auth.services';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await AuthServices.loginUser(loginData);

  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'User logged in successfully',
    data: others,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Token refreshed successfully',
    data: result,
  });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user;
  console.log(req.user);
  const { ...passwordData } = req.body;

  await AuthServices.changePassword(user, passwordData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Password changed successfully',
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
