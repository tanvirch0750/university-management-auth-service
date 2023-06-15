import { Model, Schema } from 'mongoose';

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

export type IAdmin = {
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
  designation: string;
  managementDepartment: {
    type: Schema.Types.ObjectId;
    ref: 'Management Department';
    required: true;
  };
  profileImage: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  designation?: string;
  emergencyContactNo?: string;
};
