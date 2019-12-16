import * as functions from 'firebase-functions';
import { isAdmin } from './isAdmin';
import { buildPlayerModel } from './buildPlayerModel';
import { rankPlayers } from './rankPlayers';
import { GameData, GameDataPlayer } from '../../../types/GameData';

const weekPath = `week`;
const playersPath = `players`;
const schedulePath = `schedule`;
const tieBreakersPath = `tieBreakers`;
const picksPath = `picks`;

export const getGameData = async(context: any, database: any, adminVersion: boolean, overrideAdmin?: boolean): Promise<GameData> => {

  if (adminVersion) {
    const isUserAdmin = await isAdmin(context, database);

    if (!isUserAdmin && !overrideAdmin) {
      throw new functions.https.HttpsError('permission-denied', 'only admin can call this function');
    }
  }

  const loggedInUserId = context.auth ? context.auth.uid : null;

  const weekSnapshot = await database.ref(weekPath).once('value');
  const week = weekSnapshot.val();

  const playersSnapshot = await database.ref(playersPath).once('value');
  const dbPlayers = playersSnapshot.val();

  const tieBreakersSnapshot = await database.ref(tieBreakersPath).once('value');
  const tieBreakers = tieBreakersSnapshot.val();

  const scheduleSnapshot = await database.ref(schedulePath).once('value');
  const schedule = scheduleSnapshot.val();

  const allPicksSnapshot = await database.ref(picksPath).once('value');
  const allPicks = allPicksSnapshot.val();

  let players: Array<GameDataPlayer> = [];

  if (dbPlayers) {
    const results: Array<Promise<GameDataPlayer>> = [];

    Object.keys(dbPlayers).forEach(async playerId => {
      results.push(buildPlayerModel(dbPlayers[playerId], database, loggedInUserId, schedule, tieBreakers, allPicks, adminVersion));
    });

    players = await Promise.all(results);
  }

  await rankPlayers(players, tieBreakers, week);

  const returnVal: GameData = { week, players, tieBreakers, schedule };

  return returnVal;
};
