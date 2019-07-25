// given the full schedule, a team, and week, return the game start time in epoch ms
exports.getGameTime = (schedule, weekNumber, team) => {
  const scheduleWeek = schedule[weekNumber];

  const game = scheduleWeek.find(weekGame => {
    return weekGame.awayTeam === team || weekGame.homeTeam === team;
  });

  if (game) {
    return game.time;
  }

  return 0;
};
