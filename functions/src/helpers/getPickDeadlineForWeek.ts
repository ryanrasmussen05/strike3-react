import * as moment from 'moment';
import 'moment-timezone';
import { Schedule } from '../../../types/Schedule';

// return the Sunday @ Noon epoch for given week
export const getPickDeadlineForWeek = (week: number, schedule: Schedule): number => {
  if (!schedule) {
    return Date.now() + 999999999999;
  }

  const scheduleWeek = schedule[week];

  const deadlineGame = scheduleWeek.find(game => {
    const gameMoment = moment(game.time);
    const parsedGameTime = gameMoment.tz('America/Chicago').format('dddd M/D/YYYY - h:mma');

    const isSunday = parsedGameTime.toLowerCase().includes('sunday');
    const isNoon = parsedGameTime.includes('12:00') || parsedGameTime.includes('1:00'); // account for DST if schedule hasn't been updated

    return isSunday && isNoon;
  });

  return deadlineGame ? deadlineGame.time : Date.now();
};
