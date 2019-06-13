const getGameDataAdminFunction = require('./getGameDataAdmin').handler;

exports.handler = async(tieBreaker, context, database) => {
  const path = `tieBreakers/${tieBreaker.week}`;

  await database.ref(path).remove();

  const gameData = await getGameDataAdminFunction(context, database);

  return gameData;
};
