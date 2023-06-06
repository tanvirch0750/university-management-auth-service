import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  academeicSemesterMonths,
  academicSemeseterCode,
  academicSemesterTitle,
} from './academicSemester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemeseterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academeicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academeicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const existingSemester = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (existingSemester) {
    const error = new ApiError(
      'This academic semister already exist',
      httpStatus.CONFLICT
    );
    return next(error);
  }
  next();
});

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'Academic Semester',
  academicSemesterSchema
);

export default AcademicSemester;
