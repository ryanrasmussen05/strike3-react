import { createSelector } from 'reselect';

export const selectModalState = ({ modal }) => modal;

export const selectShowLoginModal = createSelector(
  [selectModalState],
  modal => modal.showLoginModal
);
