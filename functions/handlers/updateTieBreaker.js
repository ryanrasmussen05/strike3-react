const getGameDataAdminFunction = require('./getGameDataAdmin').handler;

exports.handler = async(tieBreaker, context, database) => {
  const path = `tieBreakers/${tieBreaker.week}`;

  const dbTieBreaker = {
    awayTeam: tieBreaker.awayTeam,
    awayTeamPoints: tieBreaker.awayTeamPoints,
    homeTeam: tieBreaker.homeTeam,
    homeTeamPoints: tieBreaker.homeTeamPoints,
  };

  await database.ref(path).update(dbTieBreaker);

  const gameData = await getGameDataAdminFunction(context, database);

  return gameData;
};
