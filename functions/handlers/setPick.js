const functions = require('firebase-functions');
const getGameDataFunction = require('./getGameData').handler;

exports.handler = async(pick, context, database) => {
  const { team, week, userId } = pick;

  const loggedInUserId = context.auth ? context.auth.uid : null;

  const pickPath = `picks/${userId}/${week}`;
  const allPicksPath = `picks/${userId}`;

  // verify minimum information to set pick
  if (!team || !week || !userId) {
    throw new functions.https.HttpsError('invalid-argument', 'team, week, and userId are required');
  }

  // only the owner can set their picks
  if (!loggedInUserId || loggedInUserId !== userId) {
    throw new functions.https.HttpsError('permission-denied', 'only the owner of the pick can call setPick');
  }

  // check if user is allowed to change current pick
  const existingPickSnapshot = await database.ref(pickPath).once('value');
  const existingPick = existingPickSnapshot.val();

  if (existingPick) {
    // TODO check if game has started, if has throw error
  }

  // check if user has already picked this team
  const allExistingPickSnapshot = await database.ref(allPicksPath).once('value');
  const allExistingPicks = allExistingPickSnapshot.val();

  if (!!allExistingPicks) {
    delete allExistingPicks[week]; // so a player can resubmit the same pick

    const isAlreadyPicked = Object.values(allExistingPicks).some(oldPick => oldPick.team === team);

    if (isAlreadyPicked) {
      throw new functions.https.HttpsError('already-exists', 'team already picked');
    }
  }

  // submit pick
  await database.ref(pickPath).update({ team, status: 'open' });

  // refresh gameData
  const gameData = await getGameDataFunction(context, database);

  return gameData;
};
