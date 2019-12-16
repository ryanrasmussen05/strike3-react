import { getGameDataAdminHandler } from './getGameDataAdmin';
import { TieBreaker } from '../../../types/TieBreaker';
import { GameData } from '../../../types/GameData';

export const updateTieBreakerHandler = async(tieBreaker: TieBreaker, context: any, database: any): Promise<GameData> => {
  const path = `tieBreakers/${ tieBreaker.week }`;

  const dbTieBreaker = {
    awayTeam: tieBreaker.awayTeam,
    awayTeamPoints: tieBreaker.awayTeamPoints,
    homeTeam: tieBreaker.homeTeam,
    homeTeamPoints: tieBreaker.homeTeamPoints,
  };

  await database.ref(path).update(dbTieBreaker);

  const gameData = await getGameDataAdminHandler(context, database);

  return gameData;
};
