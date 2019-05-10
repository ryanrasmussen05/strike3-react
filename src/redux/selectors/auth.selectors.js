import { createSelector } from 'reselect';

export const selectAuthState = ({ auth }) => auth;

export const selectAuthLoading = createSelector(
  [selectAuthState],
  auth => auth.loading
);

export const selectAuthError = createSelector(
  [selectAuthState],
  auth => auth.error
);

export const selectLoggedInUser = createSelector(
  [selectAuthState],
  auth => auth.loggedInUser
);

export const selectLoggedInUserId = createSelector(
  [selectLoggedInUser],
  user => user ? user.uid : null
);
