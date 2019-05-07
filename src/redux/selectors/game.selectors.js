import { createSelector } from 'reselect';

export const selectGameState = ({ game }) => game;

export const selectSelectedWeek = createSelector(
  [selectGameState],
  game => game.selectedWeek
);

export const selectIsSubmitting = createSelector(
  [selectGameState],
  game => game.submitInProgress
);

export const selectGameError = createSelector(
  [selectGameState],
  game => game.error
);
