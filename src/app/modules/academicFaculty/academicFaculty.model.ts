import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interfaces';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'Academic Faculty',
  academicFacultySchema
);

export default AcademicFaculty;
