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

export const selectSchedulePreview = createSelector(
  [selectAdminState],
  admin => admin.schedulePreview
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

export const selectIsSuperuser = createSelector(
  [selectLoggedInUserId, selectAdminGameData, selectGameData],
  (userId, adminGameData, gameData) => {
    if (!userId || (!gameData && !adminGameData)) {
      return false;
    }

    const actingGameData = adminGameData || gameData;

    const loggedInPlayer = actingGameData.players.find(player => player.id === userId);

    return loggedInPlayer.superuser;
  }
);

export const selectRosterPlayers = createSelector(
  [selectAdminGameData],
  gameData => {
    if (!gameData) {
      return [];
    }

    const rosterPlayers = gameData.players.map(player => ({
      name: player.name,
      email: player.email,
    }));

    rosterPlayers.sort((a, b) => a.name.localeCompare(b.name));

    return rosterPlayers;
  }
);

export const selectAdminTieBreakers = createSelector(
  [selectAdminGameData],
  gameData => {
    if (!gameData) {
      return [];
    }

    const tieBreakerArray = [];

    for (let i = 1; i <= 17; i++) {
      if (gameData.tieBreakers && !!gameData.tieBreakers[i]) {
        tieBreakerArray.push({
          week: i,
          ...gameData.tieBreakers[i],
        });
      }
    }

    return tieBreakerArray;
  }
);
