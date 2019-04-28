import { createSelector } from 'reselect';

export const selectSampleState = ({ sample }) => sample;

export const selectSampleText = createSelector(
  [selectSampleState],
  sample => sample.sampleText
);
