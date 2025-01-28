import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import authReducer from './auth/authSlice';
import { authAPI } from '../api/auth/authAPI';
import { walletAPI } from '../api/walletAPI';

export const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const authReducerPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whiteList: ['finishGetStarted', 'isShowCongratsScreen'],
};

export const combinedReducer = combineReducers({
  authReducer: persistReducer(authReducerPersistConfig, authReducer),
  [authAPI.reducerPath]: authAPI.reducer,
  [walletAPI.reducerPath]: walletAPI.reducer,
});

export const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState;
  }

  return combinedReducer(state, action);
};

export const RESET_STATE_ACTION_TYPE = 'resetState';
export const resetStateAction = createAction(RESET_STATE_ACTION_TYPE, () => {
  return { payload: null };
});

export type RootState = ReturnType<typeof combinedReducer>;
