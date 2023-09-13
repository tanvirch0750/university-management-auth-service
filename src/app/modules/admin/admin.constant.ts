import { IBloodGroup, IGender } from './admin.interface';

export const bloodGroup: IBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const gender: IGender[] = ['male', 'female'];

export const adminSearchableFields = [
  'id',
  'email',
  'contactNo',
  'designation',
  'name.fisrtName',
  'name.middleName',
  'name.lastName',
];

export const adminFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'designation',
  'email',
  'contactNo',
  'emergencyContactNo',
];
