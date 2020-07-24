import moment from 'moment';
import 'moment-timezone';

const nflScheduleUrl = 'https://api.mysportsfeeds.com/v1.1/pull/nfl/2020-2021-regular/full_game_schedule.json';
const nflApiAuth = 'rlras05:strike3';

const headers = new Headers({
  Authorization: `Basic ${ btoa(nflApiAuth) }`,
  'Content-Type': 'application/json',
});

export const fetchNflSchedule = () => fetch(nflScheduleUrl, { headers });

const getTeamAbbreviation = rawAbbreviation => {
  if (rawAbbreviation === 'LA') {
    return 'LAR';
  }

  return rawAbbreviation;
};

export const parseNflSchedule = rawNflSchedule => {
  if (!rawNflSchedule || !rawNflSchedule.fullgameschedule) {
    return null;
  }

  const weeks = {};

  rawNflSchedule.fullgameschedule.gameentry.forEach(rawNflGame => {
    const week = parseInt(rawNflGame.week, 10);

    const homeTeam = getTeamAbbreviation(rawNflGame.homeTeam.Abbreviation);
    const awayTeam = getTeamAbbreviation(rawNflGame.awayTeam.Abbreviation);

    const timeString = moment(rawNflGame.time, ['h:mm A']).format('HH:mm');
    const dateTimeString = `${ rawNflGame.date } ${ timeString }`;
    const gameMoment = moment.tz(dateTimeString, 'America/New_York');

    const game = {
      homeTeam,
      awayTeam,
      time: gameMoment.valueOf(),
      timeString: new Date(gameMoment.valueOf()).toLocaleString(),
    };

    if (weeks[week]) {
      weeks[week].push(game);
    } else {
      weeks[week] = [game];
    }

  });

  return weeks;
};
