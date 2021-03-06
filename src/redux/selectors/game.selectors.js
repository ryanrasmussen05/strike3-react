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

export const selectPickForCurrentWeek = createSelector(
  [selectLoggedInUserId, selectCurrentWeek, selectGameData],
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

export const selectTieBreakerForCurrentWeek = createSelector(
  [selectCurrentWeek, selectGameData],
  (week, gameData) => {
    if (!week || !gameData || !gameData.tieBreakers) {
      return null;
    }

    return gameData.tieBreakers[week];
  }
);

export const selectTieBreakerForSelectedWeek = createSelector(
  [selectSelectedWeek, selectGameData],
  (week, gameData) => {
    if (!week || !gameData || !gameData.tieBreakers) {
      return null;
    }

    return gameData.tieBreakers[week];
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

// return a list of teams that are NOT on a bye week for selected week
export const selectTeamsPlayeringForSelectedWeek = createSelector(
  [selectSelectedWeek, selectGameData],
  (week, gameData) => {
    if (!week || !gameData || !gameData.schedule) {
      return [];
    }

    const teams = [];
    const games = gameData.schedule[week];

    games.forEach(game => {
      teams.push(game.homeTeam);
      teams.push(game.awayTeam);
    });

    return teams;
  }
);
