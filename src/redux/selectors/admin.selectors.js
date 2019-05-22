import { createSelector } from 'reselect';
import { selectLoggedInUserId } from './auth.selectors';

export const selectAdminState = ({ admin }) => admin;

export const selectAdminGameData = createSelector(
  [selectAdminState],
  admin => admin.gameData,
);

export const selectAdminSelectedPlayer = createSelector(
  [selectAdminState],
  admin => admin.selectedPlayer,
);

export const selectAdminSelectedPick = createSelector(
  [selectAdminState],
  admin => admin.selectedPick,
);

export const selectAdminError = createSelector(
  [selectAdminState],
  admin => admin.error
);

export const selectAdminIsSubmitting = createSelector(
  [selectAdminState],
  admin => admin.submitInProgress
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
