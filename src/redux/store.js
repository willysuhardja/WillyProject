import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import {createWhitelistFilter} from 'redux-persist-transform-filter';

import appReducer from './appReducer';
import appMiddlewares from './appMiddleware';

const whiteList = [
  createWhitelistFilter('auth', ['token', 'branch']),
  createWhitelistFilter('account', ['profile']),
];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [...whiteList],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(persistedReducer, appMiddlewares);
export const persistor = persistStore(store);
