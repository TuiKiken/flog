import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSage from 'sagas';
import { reducer as userReducer  } from './user';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [],
}

const reducers = persistReducer(persistConfig, combineReducers({
  user: userReducer,
}));

const middlewares: SagaMiddleware[] = [];

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSage);
