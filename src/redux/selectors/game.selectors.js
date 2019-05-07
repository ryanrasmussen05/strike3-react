import { createSelector } from 'reselect';

export const selectGameState = ({ game }) => game;

export const selectSelectedWeek = createSelector(
  [selectGameState],
  game => game.selectedWeek
);
