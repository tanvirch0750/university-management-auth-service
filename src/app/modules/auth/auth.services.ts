import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import User from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // const user = new User() // if we use instance method
  // check user exist
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  } else if (
    // match password
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError('Password is incorrect', httpStatus.UNAUTHORIZED);
  } else {
    // create access token and refresh token
    const { id: userId, role, needsPasswordChange } = isUserExist;
    const accessToken = jwtHelpers.createToken(
      { userId, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
      { userId, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );

    return {
      accessToken,
      refreshToken,
      needsPasswordChange,
    };
  }
};

export const AuthServices = {
  loginUser,
};
