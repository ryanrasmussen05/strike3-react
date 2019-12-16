import { getGameDataAdminHandler } from './getGameDataAdmin';
import { TieBreaker } from '../../../types/TieBreaker';
import { GameData } from '../../../types/GameData';

export const createTieBreakerHandler = async(tieBreaker: TieBreaker, context: any, database: any): Promise<GameData> => {
  const path = `tieBreakers/${ tieBreaker.week }`;

  const dbTieBreaker = {
    awayTeam: tieBreaker.awayTeam,
    homeTeam: tieBreaker.homeTeam,
  };

  await database.ref(path).set(dbTieBreaker);

  const gameData = await getGameDataAdminHandler(context, database);

  return gameData;
};
