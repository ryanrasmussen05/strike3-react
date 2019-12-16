import { getGameData } from './getGameData';
import { GameData } from '../../../types/GameData';

// returns the first week number that has an open pick status
const getActiveWeek = (gameData: GameData): number => {
  if (!gameData.players || gameData.players.length === 0) {
    return 1;
  }

  for (let week = 1; week <= 17; week++) {
    for (const player of gameData.players) {
      const pick = player.picks[week - 1];

      if (pick.status === 'open') {
        return week;
      }
    }
  }

  return 17;
};

// if all results are set for current week, increment the week
export const updateCurrentWeek = async(context: any, database: any): Promise<GameData> => {
  const gameData = await getGameData(context, database, true);

  const currentWeek = gameData.week;
  const desiredCurrentWeek = getActiveWeek(gameData);

  if (desiredCurrentWeek && (currentWeek !== desiredCurrentWeek)) {
    await database.ref(`week`).set(desiredCurrentWeek);
    gameData.week = desiredCurrentWeek;
  }

  return gameData;
};
