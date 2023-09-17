import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  EVENT_ACADEMIC_FACULTY_DELETED,
  EVENT_ACADEMIC_FACULTY_UPDATED,
} from './academicFaculty.constant';
import {
  IAcademicFacultyCreatedEvent,
  IAcademicFacultyDeletedEvent,
  IAcademicFacultyUpdatedEvent,
} from './academicFaculty.interfaces';
import { AcademicFacultyServices } from './academicFaculty.services';

const initAcademicFacultyEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_CREATED, async (e: string) => {
    const data: IAcademicFacultyCreatedEvent = JSON.parse(e);

    await AcademicFacultyServices.insertIntoDBFromEvent(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_UPDATED, async (e: string) => {
    const data: IAcademicFacultyUpdatedEvent = JSON.parse(e);

    await AcademicFacultyServices.updateOneInDBFromEvent(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_FACULTY_DELETED, async (e: string) => {
    const data: IAcademicFacultyDeletedEvent = JSON.parse(e);

    await AcademicFacultyServices.deleteOneFromDBFromEvent(data.id);
  });
};

export default initAcademicFacultyEvents;
