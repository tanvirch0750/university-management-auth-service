import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces';

export type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IGender = 'male' | 'female';

export type IBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type IDesignation =
  | 'Professor'
  | 'Lecturer'
  | 'Associate Professor'
  | 'Assistant Professor'
  | 'Research Professor'
  | 'Adjunct Professor'
  | 'Visiting Professor'
  | 'Emeritus Professor';

export type IFaculty = {
  id: string;
  name: Name;
  gender: IGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: IBloodGroup;
  designation: IDesignation;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  profileImage: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  designation?: string;
  emergencyContactNo?: string;
};
