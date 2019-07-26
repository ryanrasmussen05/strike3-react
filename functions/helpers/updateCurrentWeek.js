const getGameData = require('./getGameData').getGameData;

// returns the first week number that has an open pick status
const getActiveWeek = gameData => {
  let activeWeek = 1;

  for (let week = 1; week <= 17; week++) {
    for (const player of gameData.players) {
      const pick = player.picks[week - 1];

      if (pick.status === 'open') {
        activeWeek = week;
        return activeWeek;
      }
    }
  }
};

// if all results are set for current week, increment the week
exports.updateCurrentWeek = async(context, database) => {
  const gameData = await getGameData(context, database, true);

  const currentWeek = gameData.week;
  const desiredCurrentWeek = getActiveWeek(gameData);

  if (desiredCurrentWeek && (currentWeek !== desiredCurrentWeek)) {
    await database.ref(`week`).set(desiredCurrentWeek);
    gameData.week = desiredCurrentWeek;
  }

  return gameData;
};
