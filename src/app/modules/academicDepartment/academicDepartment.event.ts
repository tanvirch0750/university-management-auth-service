import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_DELETED,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
} from './academicDepartment.constant';
import {
  IAcademicDepartmentCreatedEvent,
  IAcademicDepartmentDeletedEvent,
  IAcademicDepartmentUpdatedEvent,
} from './academicDepartment.interfaces';
import { AcademicDepartmentServices } from './academicDepartment.services';

const initAcademicDepartmentEvents = () => {
  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    async (e: string) => {
      const data: IAcademicDepartmentCreatedEvent = JSON.parse(e);

      await AcademicDepartmentServices.insertIntoDBFromEvent(data);
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_UPDATED,
    async (e: string) => {
      const data: IAcademicDepartmentUpdatedEvent = JSON.parse(e);

      await AcademicDepartmentServices.updateOneInDBFromEvent(data);
    }
  );

  RedisClient.subscribe(
    EVENT_ACADEMIC_DEPARTMENT_DELETED,
    async (e: string) => {
      const data: IAcademicDepartmentDeletedEvent = JSON.parse(e);

      await AcademicDepartmentServices.deleteOneFromDBFromEvent(data.id);
    }
  );
};

export default initAcademicDepartmentEvents;
