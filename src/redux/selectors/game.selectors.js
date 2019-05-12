import { createSelector } from 'reselect';

export const selectGameState = ({ game }) => game;

export const selectIsSubmitting = createSelector(
  [selectGameState],
  game => game.submitInProgress
);

export const selectGameError = createSelector(
  [selectGameState],
  game => game.error
);

export const selectGameData = createSelector(
  [selectGameState],
  game => game.gameData,
);

export const selectSelectedWeek = createSelector(
  [selectGameState],
  game => game.selectedWeek
);

export const selectCurrentWeek = createSelector(
  [selectGameData],
  gameData => {
    if (gameData) {
      return gameData.week;
    }
    return null;
  }
);

export const selectPlayersForSelectedWeek = createSelector(
  [selectSelectedWeek, selectGameData],
  (week, gameData) => {
    if (!!week && !!gameData) {
      const players = [];

      // don't show null picks in the week table
      for (const player of gameData.players) {
        if (player.picks && player.picks[week - 1] && player.picks[week - 1].team !== null) {
          players.push({
            name: player.name,
            pick: player.picks[week - 1],
          });
        }
      }

      return players;
    }

    return [];
  }
);
