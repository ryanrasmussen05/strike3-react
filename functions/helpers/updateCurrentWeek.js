const getGameData = require('./getGameData').getGameData;

// if all results are set for current week, increment the week
exports.updateCurrentWeek = async(context, database) => {
  const gameData = await getGameData(context, database, true);

  const week = gameData.week;

  let weekIsComplete = true;

  for (const player of gameData.players) {
    const pick = player.picks[week - 1];

    if (pick.status === 'open') {
      weekIsComplete = false;
      break;
    }
  }

  if (weekIsComplete) {
    await database.ref(`week`).set(week + 1);
    gameData.week = week + 1;
  }

  return gameData;
};
