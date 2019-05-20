import { createSelector } from 'reselect';
import { selectLoggedInUserId } from './auth.selectors';
import { selectGameData } from './game.selectors';

export const selectIsAdmin = createSelector(
  [selectLoggedInUserId, selectGameData],
  (userId, gameData) => {
    if (!userId || !gameData) {
      return false;
    }

    const loggedInPlayer = gameData.players.find(player => player.id === userId);

    return loggedInPlayer.admin || loggedInPlayer.superuser;
  }
);
