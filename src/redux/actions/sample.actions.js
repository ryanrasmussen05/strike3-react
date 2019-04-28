import { ActionTypes } from './action.types';

export const sampleAction = sampleText => ({
  type: ActionTypes.SAMPLE.SAMPLE_ACTION,
  payload: sampleText,
});

export const sampleSagaAction = () => ({
  type: ActionTypes.SAMPLE.SAMPLE_SAGA_ACTION,
});
