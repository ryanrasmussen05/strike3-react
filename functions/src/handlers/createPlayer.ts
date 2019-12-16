import { Player } from '../../../types/Player';
import { getGameDataHandler } from './getGameData';
import { GameData } from '../../../types/GameData';

export const createPlayerHandler = async(user: Player, context: any, database: any): Promise<GameData> => {
  const path = `players/${ user.id }`;

  await database.ref(path).set(user);

  const gameData = await getGameDataHandler(context, database);

  return gameData;
};
