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

academicSemesterSchema.pre('validate', async function (next) {
  try {
    const existingSemester = await AcademicSemester.findOne({
      _id: { $ne: this._id },
      title: this.title,
      year: this.year,
      code: this.code,
      startMonth: this.startMonth,
      endMonth: this.endMonth,
    });

    if (existingSemester) {
      const error = new ApiError('This semister already exist', 400);
      return next(error);
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'Academic Semester',
  academicSemesterSchema
);

export default AcademicSemester;
