import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import User from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // const user = new User() // if we use instance method
  // check user exist
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError('Password is incorrect', httpStatus.UNAUTHORIZED);
  }

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
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError('Invalid Refresh Token', httpStatus.FORBIDDEN);
  }

  const { userId } = verifiedToken;

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  } else {
    //generate new token
    const newAccessToken = jwtHelpers.createToken(
      {
        id: isUserExist.id,
        role: isUserExist.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    return {
      accessToken: newAccessToken,
    };
  }
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await User.isUserExist(user?.userId);

  if (!isUserExist) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError('Old password is incorrect', httpStatus.UNAUTHORIZED);
  }

  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    { id: user?.userId },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
};
