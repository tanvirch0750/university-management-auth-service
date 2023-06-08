import {
  ISemesterCode,
  ISemesterMonthName,
  ISemesterTitle,
} from './academicSemester.interface';

export const academeicSemesterMonths: ISemesterMonthName[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitle: ISemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemeseterCode: ISemesterCode[] = ['01', '02', '03'];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchableFields = ['title', 'code', 'year'];

export const academeicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
