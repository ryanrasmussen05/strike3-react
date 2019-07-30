const getGameDataFunction = require('./getGameData').handler;

exports.handler = async(user, context, database) => {
  const path = `players/${ user.id }`;

  await database.ref(path).set(user);

  const gameData = await getGameDataFunction(context, database);

  return gameData;
};
