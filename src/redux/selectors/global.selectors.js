import { createSelector } from 'reselect';

export const selectGlobalState = ({ global }) => global;

export const selectGlobalLoading = createSelector(
  [selectGlobalState],
  global => global.loading
);
