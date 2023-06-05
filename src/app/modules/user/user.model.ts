import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: [true, 'A user must have a ID'],
      unique: true,
    },
    role: {
      type: String,
      required: [true, 'A user must have a role'],
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser, UserModel>('Users', userSchema);

export default User;
