import { createSelector } from 'reselect';
import { selectLoggedInUserId } from './auth.selectors';

export const selectAdminState = ({ admin }) => admin;

export const selectAdminGameData = createSelector(
  [selectAdminState],
  admin => admin.gameData,
);

export const selectAdminError = createSelector(
  [selectAdminState],
  admin => admin.error
);

export const selectIsAdmin = createSelector(
  [selectLoggedInUserId, selectAdminGameData],
  (userId, gameData) => {
    if (!userId || !gameData || !gameData.players) {
      return false;
    }

    const loggedInPlayer = gameData.players.find(player => player.id === userId);

    return loggedInPlayer.admin || loggedInPlayer.superuser;
  }
);
