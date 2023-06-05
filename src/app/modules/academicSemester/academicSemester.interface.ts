import { Model } from 'mongoose';

export type ISemesterMonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type ISemesterTitle = 'Autumn' | 'Summer' | 'Fall';

export type ISemesterCode = '01' | '02' | '03';

export type IAcademicSemester = {
  title: ISemesterTitle;
  year: number;
  code: ISemesterCode;
  startMonth: ISemesterMonthName;
  endMonth: ISemesterMonthName;
};

export type AcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>;
