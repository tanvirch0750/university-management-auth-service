import { Schema, model } from 'mongoose';
import {
  IManagementDepartment,
  ManagementDepartmentModel,
} from './managementDepartment.interface';

const managementDepartmentSchema = new Schema<IManagementDepartment>(
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

const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentModel
>('Management Department', managementDepartmentSchema);

export default ManagementDepartment;
