import { getGameDataAdminHandler } from './getGameDataAdmin';
import { TieBreaker } from '../../../types/TieBreaker';
import { GameData } from '../../../types/GameData';

export const deleteTieBreakerHandler = async(tieBreaker: TieBreaker, context: any, database: any): Promise<GameData> => {
  const path = `tieBreakers/${ tieBreaker.week }`;

  await database.ref(path).remove();

  const gameData = await getGameDataAdminHandler(context, database);

  return gameData;
};
