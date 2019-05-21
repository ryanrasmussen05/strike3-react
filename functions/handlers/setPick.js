const functions = require('firebase-functions');

exports.handler = async(pick, context, database) => {
  const { team, week, userId } = pick;

  const pickPath = `picks/${userId}/${week}`;
  const allPicksPath = `picks/${userId}`;

  // verify minimum information to set pick
  if (!team || !week || !userId) {
    throw new functions.https.HttpsError('invalid-argument', 'team, week, and userId are required');
  }

  // check if user is allowed to change current pick
  const existingPickSnapshot = await database.ref(pickPath).once('value');
  const existingPick = existingPickSnapshot.val();

  if (existingPick) {
    // TODO check if game has started
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

  return { pick };
};
