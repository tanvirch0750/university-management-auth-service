/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  passwordChangedAt?: Date;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

// instance methods
export type IUserMethods = {
  isUserExist(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

// static methods
export interface UserModel
  extends Model<IUser, Record<string, never>, IUserMethods> {
  // static methods
  isUserExist(
    id: string
  ): Promise<Pick<
    IUser,
    'id' | 'password' | 'needsPasswordChange' | 'role'
  > | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}

// when not using static methods
//export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
