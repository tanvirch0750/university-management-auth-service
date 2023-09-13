import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import AcademicSemester from '../academicSemester/academicSemesterModel';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import User from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

const createStudentToDB = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) user.password = config.default_student_password as string;

  // setup role
  user.role = 'student';

  // generate Id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  // transaction and rollback
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError('Failed to create student', httpStatus.BAD_REQUEST);
    }

    // set student  _id into user as reference
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError('Failed to create user', httpStatus.BAD_REQUEST);
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicFaculty' },
        { path: 'academicDepartment' },
      ],
    });
  }

  return newUserAllData;
};

const createFacultyToDB = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) user.password = config.default_faculty_password as string;

  // setup role
  user.role = 'faculty';

  // generate Id
  // transaction and rollback
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError('Failed to create faculty', httpStatus.BAD_REQUEST);
    }

    // set faculty _id into user as reference
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError('Failed to create user', httpStatus.BAD_REQUEST);
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [{ path: 'academicFaculty' }, { path: 'academicDepartment' }],
    });
  }

  return newUserAllData;
};

const createAdminToDB = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) user.password = config.default_admin_password as string;

  // setup role
  user.role = 'admin';

  // generate Id
  // transaction and rollback
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError('Failed to create admin', httpStatus.BAD_REQUEST);
    }

    // set admin _id into user as reference
    user.admin = newAdmin[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError('Failed to create user', httpStatus.BAD_REQUEST);
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [{ path: 'managementDepartment' }],
    });
  }

  return newUserAllData;
};

export const UserServices = {
  createStudentToDB,
  createFacultyToDB,
  createAdminToDB,
};
