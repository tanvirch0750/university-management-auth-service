import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './users.interface';
import User from './users.model';
import { generateUserId } from './users.utils';

export const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserId();
  user.id = id;
  // default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError('Failed to create user!', 400);
  }

  return createdUser;
};
