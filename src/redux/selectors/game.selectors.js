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