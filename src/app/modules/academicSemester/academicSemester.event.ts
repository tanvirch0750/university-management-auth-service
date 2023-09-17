import { RedisClient } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_DELETED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.constant';
import { IAcademicSemesterEvent } from './academicSemester.interface';
import { AcademicSemesterServices } from './academicSemester.services';

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterEvent = JSON.parse(e);
    await AcademicSemesterServices.createAcademicSemisterFromEventToDB(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    await AcademicSemesterServices.updateAcademicSemisterFromEventToDB(data);
  });

  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_DELETED, async (e: string) => {
    const data = JSON.parse(e);

    await AcademicSemesterServices.deleteOneFromDBFromEvent(data.id);
  });
};

export default initAcademicSemesterEvents;
