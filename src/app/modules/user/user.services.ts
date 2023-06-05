import config from '../../../config';
import { IUser } from './user.interface';
import User from './user.model';
import { generateUserId } from './user.utils';

export const createUserToDB = async (user: IUser): Promise<IUser> => {
  // auto generated incremental id
  const id = await generateUserId();
  user.id = id;

  // default password
  if (!user.password) user.password = config.default_user_password as string;

  const createdUser = await User.create(user);

  return createdUser;
};
