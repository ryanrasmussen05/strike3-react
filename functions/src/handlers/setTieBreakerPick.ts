import * as functions from 'firebase-functions';
import { getGameDataHandler } from './getGameData';
import { getGameTime } from '../helpers/getGameTime';
import { getPickDeadlineForWeek } from '../helpers/getPickDeadlineForWeek';
import { GameData } from '../../../types/GameData';
import { TieBreakerSubmitPayload } from '../../../types/TieBreaker';

export const setTieBreakerPickHandler = async(tieBreakerPick: TieBreakerSubmitPayload, context: any, database: any): Promise<GameData> => {
  const { week, userId, tieBreakerHomeTeamPoints, tieBreakerAwayTeamPoints } = tieBreakerPick;

  const loggedInUserId = context.auth ? context.auth.uid : null;

  const pickPath = `picks/${ userId }/${ week }`;
  const tieBreakerGamePath = `tieBreakers/${ week }`;

  // verify minimum information to set pick
  if (!tieBreakerHomeTeamPoints || !tieBreakerAwayTeamPoints || !week || !userId) {
    throw new functions.https.HttpsError('invalid-argument', 'both points, week, and userId are required');
  }

  // only the owner can set their picks
  if (!loggedInUserId || loggedInUserId !== userId) {
    throw new functions.https.HttpsError('permission-denied', 'only the owner of the pick can call setTieBreakerPick');
  }

  // get tie breaker game
  const tieBreakerGameSnapshot = await database.ref(tieBreakerGamePath).once('value');
  const tieBreakerGame = tieBreakerGameSnapshot.val();

  // get schedule
  const scheduleSnapshot = await database.ref('schedule').once('value');
  const schedule = scheduleSnapshot.val();

  // if past deadline (Sunday at noon) throw an error
  const weekDeadline = getPickDeadlineForWeek(week, schedule);
  if (Date.now() > weekDeadline) {
    throw new functions.https.HttpsError('permission-denied', 'deadline for week has past');
  }

  // verify tie breaker game hasn't started yet
  const tieBreakerGameTime = getGameTime(schedule, week, tieBreakerGame.awayTeam);

  if (Date.now() > tieBreakerGameTime) {
    throw new functions.https.HttpsError('out-of-range', 'cannot set tie breaker pick, game started');
  }

  // submit tie breaker pick
  await database.ref(pickPath).update({ tieBreakerHomeTeamPoints, tieBreakerAwayTeamPoints });

  // refresh gameData
  const gameData = await getGameDataHandler(context, database);

  return gameData;
};
