const getGameDataAdminFunction = require('./getGameDataAdmin').handler;

exports.handler = async(tieBreaker, context, database) => {
  const path = `tieBreakers/${tieBreaker.week}`;

  const dbTieBreaker = {
    awayTeam: tieBreaker.awayTeam,
    homeTeam: tieBreaker.homeTeam,
  };

  await database.ref(path).set(dbTieBreaker);

  const gameData = await getGameDataAdminFunction(context, database);

  return gameData;
};
