import { createSelector } from 'reselect';
import { selectLoggedInUserId } from './auth.selectors';
import { selectGameData } from './game.selectors';

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
  [selectLoggedInUserId, selectAdminGameData, selectGameData],
  (userId, adminGameData, gameData) => {
    if (!userId || (!gameData && !adminGameData)) {
      return false;
    }

    const actingGameData = adminGameData || gameData;

    const loggedInPlayer = actingGameData.players.find(player => player.id === userId);

    return loggedInPlayer.admin || loggedInPlayer.superuser;
  }
);
