import { Schedule } from '../../../types/Schedule';

// given the full schedule, a team, and week, return the game start time in epoch ms
export const getGameTime = (schedule: Schedule, weekNumber: number, team: string): number => {
  const scheduleWeek = schedule[weekNumber];

  const game = scheduleWeek.find(weekGame => {
    return weekGame.awayTeam === team || weekGame.homeTeam === team;
  });

  if (game) {
    return game.time;
  }

  return 0;
};
