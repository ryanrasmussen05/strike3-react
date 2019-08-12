const moment = require('moment');
require('moment-timezone');

// return the Sunday @ Noon epoch for given week
exports.getPickDeadlineForWeek = (week, schedule) => {
  const scheduleWeek = schedule[week];

  const deadlineGame = scheduleWeek.find(game => {
    const gameMoment = moment(game.time);
    const parsedGameTime = gameMoment.tz('America/Chicago').format('dddd M/D/YYYY - h:mma');

    const isSunday = parsedGameTime.toLowerCase().includes('sunday');
    const isNoon = parsedGameTime.includes('12:00') || parsedGameTime.includes('1:00'); // account for DST if schedule hasn't been updated

    return isSunday && isNoon;
  });

  return deadlineGame.time;
};
