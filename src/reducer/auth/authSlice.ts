import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  isFinishStarted: false,
  userInfo: null,
  walletInfo: null,
};

const slice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setInitialize: (state, action) => {
      const {isAuthenticated, walletInfo} = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.walletInfo = walletInfo;
      state.isInitialized = true;
    },
    setFinishStarted: (state, action) => {
      state.isFinishStarted = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLogin: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: state => {
      state.isInitialized = true;
      state.isAuthenticated = false;
      state.userInfo = null;
    },
    setWalletInfo: (state, action) => {
      state.walletInfo = action.payload;
    },
  },
});

export const authAction = slice.actions;
export default slice.reducer;
