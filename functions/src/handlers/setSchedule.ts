import { Schedule } from '../../../types/Schedule';

export const setScheduleHandler = async(schedule: Schedule, context: any, database: any) => {
  const path = `schedule/`;

  await database.ref(path).set(schedule);

  return {};
};
