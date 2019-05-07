import { createSelector } from 'reselect';

export const selectModalState = ({ modal }) => modal;

export const selectShowLoginModal = createSelector(
  [selectModalState],
  modal => modal.showLoginModal
);

export const selectShowCreateAccountModal = createSelector(
  [selectModalState],
  modal => modal.showCreateAccountModal
);

export const selectShowResetPasswordModal = createSelector(
  [selectModalState],
  modal => modal.showResetPasswordModal
);

export const selectShowPlayerPickModal = createSelector(
  [selectModalState],
  modal => modal.showPlayerPickModal
);
