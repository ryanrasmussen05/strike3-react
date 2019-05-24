import { createSelector } from 'reselect';
import { selectLoggedInUserId } from './auth.selectors';

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

export const selectPickForSelectedWeek = createSelector(
  [selectLoggedInUserId, selectSelectedWeek, selectGameData],
  (loggedInUserId, week, gameData) => {
    if (!loggedInUserId || !week || !gameData) {
      return null;
    }

    const player = gameData.players.find(currentPlayer => currentPlayer.id === loggedInUserId);

    if (!player) {
      return null;
    }

    return player.picks[week - 1];
  }
);

export const selectAllPicksForPlayer = createSelector(
  [selectLoggedInUserId, selectGameData],
  (loggedInUserId, gameData) => {
    if (!loggedInUserId || !gameData) {
      return null;
    }

    const player = gameData.players.find(currentPlayer => currentPlayer.id === loggedInUserId);
    return player.picks;
  }
);

export const selectPlayersForSelectedWeek = createSelector(
  [selectSelectedWeek, selectGameData],
  (week, gameData) => {
    if (!!week && !!gameData) {
      const players = [];

      for (const player of gameData.players) {
        if (player.picks && player.picks[week - 1]) {
          players.push({
            name: player.name,
            rank: player.rank,
            strikes: player.strikes,
            id: player.id,
            pick: player.picks[week - 1],
          });
        }
      }

      return players;
    }

    return [];
  }
);
