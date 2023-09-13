import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interfaces';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'Academic Faculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const AcademicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>(
  'Academic Department',
  academicDepartmentSchema
);

export default AcademicDepartment;
