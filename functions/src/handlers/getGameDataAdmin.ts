import { getGameData } from '../helpers/getGameData';
import { GameData } from '../../../types/GameData';

export const getGameDataAdminHandler = async(context: any, database: any): Promise<GameData> => {
  return getGameData(context, database, true);
};
