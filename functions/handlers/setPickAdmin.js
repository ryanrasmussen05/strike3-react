/* eslint-disable complexity */
const functions = require('firebase-functions');
const isAdmin = require('../helpers/isAdmin').isAdmin;
const updateCurrentWeek = require('../helpers/updateCurrentWeek').updateCurrentWeek;

exports.handler = async(pick, context, database) => {
  const { team, week, status, userId, tieBreakerHomeTeamPoints, tieBreakerAwayTeamPoints } = pick;

  const isUserAdmin = await isAdmin(context, database);

  if (!isUserAdmin) {
    throw new functions.https.HttpsError('permission-denied', 'only admin can call this function');
  }

  const pickPath = `picks/${userId}/${week}`;
  const allPicksPath = `picks/${userId}`;

  // verify minimum information to set pick
  if (!team || !week || !userId || !status) {
    throw new functions.https.HttpsError('invalid-argument', 'team, week, status, and userId are required');
  }

  // check if user has already picked this team
  const allExistingPickSnapshot = await database.ref(allPicksPath).once('value');
  const allExistingPicks = allExistingPickSnapshot.val();

  if (!!allExistingPicks) {
    delete allExistingPicks[week]; // so a player can resubmit the same pick

    let isAlreadyPicked = Object.values(allExistingPicks).some(oldPick => oldPick.team === team);

    // allow NP to be picked multiple times
    if (team === 'NP') {
      isAlreadyPicked = false;
    }

    if (isAlreadyPicked) {
      throw new functions.https.HttpsError('already-exists', 'team already picked');
    }
  }

  const validatedPick = { team, status };

  if (tieBreakerHomeTeamPoints || tieBreakerAwayTeamPoints) {
    validatedPick.tieBreakerHomeTeamPoints = tieBreakerHomeTeamPoints;
    validatedPick.tieBreakerAwayTeamPoints = tieBreakerAwayTeamPoints;
  }

  // submit pick
  await database.ref(pickPath).update(validatedPick);

  // if all results are set for week, update the current week
  const updatedGameData = await updateCurrentWeek(context, database);

  return updatedGameData;
};
