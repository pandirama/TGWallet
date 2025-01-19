import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  isFinishStarted: false,
  userInfo: null,
};

const slice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setInitialize: (state, action) => {
      const {isAuthenticated, user} = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.userInfo = user;
      state.isInitialized = true;
    },
    setFinishStarted: (state, action) => {
      state.isFinishStarted = action.payload;
    },
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logout: state => {
      state.isInitialized = true;
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const authAction = slice.actions;
export default slice.reducer;
