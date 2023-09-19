import { IBloodGroup, IGender } from './student.interface';

export const gender: IGender[] = ['male', 'female'];
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

export const studentSearchableFields = [
  'id',
  'email',
  'contactNo',
  'name.fisrtName',
  'name.middleName',
  'name.lastName',
];

export const studentFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];

export const EVENT_STUDENT_UPDATED = 'student-updated';
