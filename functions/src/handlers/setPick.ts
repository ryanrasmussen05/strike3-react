/* eslint-disable complexity,max-statements */
import * as functions from 'firebase-functions';
import { getGameDataHandler } from './getGameData';
import { getGameTime } from '../helpers/getGameTime';
import { getPickDeadlineForWeek } from '../helpers/getPickDeadlineForWeek';
import { Pick, PickSubmitPayload } from '../../../types/Pick';
import { GameData } from '../../../types/GameData';

export const setPickHandler = async(pick: PickSubmitPayload, context: any, database: any): Promise<GameData> => {
  const { team, week, userId } = pick;

  const loggedInUserId = context.auth ? context.auth.uid : null;

  const pickPath = `picks/${ userId }/${ week }`;
  const allPicksPath = `picks/${ userId }`;

  // verify minimum information to set pick
  if (!team || !week || !userId) {
    throw new functions.https.HttpsError('invalid-argument', 'team, week, and userId are required');
  }

  // only the owner can set their picks
  if (!loggedInUserId || loggedInUserId !== userId) {
    throw new functions.https.HttpsError('permission-denied', 'only the owner of the pick can call setPick');
  }

  // get schedule
  const scheduleSnapshot = await database.ref('schedule').once('value');
  const schedule = scheduleSnapshot.val();

  // if past deadline (Sunday at noon) throw an error
  const weekDeadline = getPickDeadlineForWeek(week, schedule);
  if (Date.now() > weekDeadline) {
    throw new functions.https.HttpsError('permission-denied', 'deadline for week has past');
  }

  // check if user is allowed to change current pick
  const existingPickSnapshot = await database.ref(pickPath).once('value');
  const existingPick = existingPickSnapshot.val();

  // if the user has an existing pick, and that game has started, throw an error
  if (existingPick && existingPick.team && existingPick.team !== 'NP') {
    const currentTime = Date.now();
    const existingPickTime = getGameTime(schedule, week, existingPick.team);

    if (currentTime > existingPickTime) {
      throw new functions.https.HttpsError('out-of-range', 'existing pick game started');
    }
  }

  // check if user has already picked this team
  const allExistingPickSnapshot = await database.ref(allPicksPath).once('value');
  const allExistingPicks: Array<Pick> = allExistingPickSnapshot.val();

  if (!!allExistingPicks) {
    delete allExistingPicks[week]; // so a player can resubmit the same pick

    const isAlreadyPicked = Object.values(allExistingPicks).some(oldPick => oldPick.team === team);

    if (isAlreadyPicked) {
      throw new functions.https.HttpsError('already-exists', 'team already picked');
    }
  }

  // verify selected pick game hasn't started yet
  const newPickGameTime = getGameTime(schedule, week, team);

  if (Date.now() > newPickGameTime) {
    throw new functions.https.HttpsError('out-of-range', 'new pick game started');
  }

  // submit pick
  await database.ref(pickPath).update({ team, status: 'open' });

  // refresh gameData
  const gameData = await getGameDataHandler(context, database);

  return gameData;
};
