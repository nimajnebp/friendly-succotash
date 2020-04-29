import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers/rootReducer';
import rootSaga from 'sagas/rootSaga';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// PROD
function configureStoreProd(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
  ];
  const store = createStore(persistedReducer, initialState, compose(
    applyMiddleware(...middlewares),
  ));
  sagaMiddleware.run(rootSaga);
  return store;
}
// DEV
function configureStoreDev(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    reduxImmutableStateInvariant(),
    sagaMiddleware,
  ];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(persistedReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
  ));
  if (module.hot) {
    module.hot.accept('reducers/rootReducer', () => {
      const nextReducer = require('reducers/rootReducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }
  sagaMiddleware.run(rootSaga);
  return store;
}
export const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;
const store = configureStore();
export default store;
