import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger();

  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }

  const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
