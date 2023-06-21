import { IBloodGroup, IDesignation, IGender } from './faculty.interface';

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

export const designation: IDesignation[] = [
  'Professor',
  'Lecturer',
  'Associate Professor',
  'Assistant Professor',
  'Research Professor',
  'Adjunct Professor',
  'Visiting Professor',
  'Emeritus Professor',
];

export const facultySearchableFields = [
  'id',
  'email',
  'contactNo',
  'designation',
  'name.fisrtName',
  'name.middleName',
  'name.lastName',
];

export const facultyFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'designation',
  'email',
  'contactNo',
  'emergencyContactNo',
  'designation',
];
