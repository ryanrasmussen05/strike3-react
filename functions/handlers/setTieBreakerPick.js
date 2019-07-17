const functions = require('firebase-functions');
const getGameDataFunction = require('./getGameData').handler;

exports.handler = async(tieBreakerPick, context, database) => {
  const { week, userId, tieBreakerHomeTeamPoints, tieBreakerAwayTeamPoints } = tieBreakerPick;

  const loggedInUserId = context.auth ? context.auth.uid : null;

  const pickPath = `picks/${userId}/${week}`;

  // verify minimum information to set pick
  if (!tieBreakerHomeTeamPoints || !tieBreakerAwayTeamPoints || !week || !userId) {
    throw new functions.https.HttpsError('invalid-argument', 'both points, week, and userId are required');
  }

  // only the owner can set their picks
  if (!loggedInUserId || loggedInUserId !== userId) {
    throw new functions.https.HttpsError('permission-denied', 'only the owner of the pick can call setTieBreakerPick');
  }

  // TODO check if game has started, if has throw error

  // submit tie breaker pick
  await database.ref(pickPath).update({ tieBreakerHomeTeamPoints, tieBreakerAwayTeamPoints });

  // refresh gameData
  const gameData = await getGameDataFunction(context, database);

  return gameData;
};
