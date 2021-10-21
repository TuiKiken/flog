import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTH_PROVIDER } from 'constants/auth';
import { RootState } from 'store';

type UserInfo = {
  uid: string;
  displayName: string;
  photoURL: string;
};

type UserSliceState = {
  info?: UserInfo | null;
};

export type SignInRequest = {
  provider: AUTH_PROVIDER;
};

export type AuthSuccess = UserInfo;

const initialState: UserSliceState = {};

export const signInRequest = createAction<SignInRequest>('signInRequest');
export const signOutRequest = createAction('signOutRequest');

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<AuthSuccess>) => {
      const { payload } = action;

      state.info = payload;
    },
    signOutSuccess: (state) => {
      state.info = null;
    },
  }
});

const getUser = (state: RootState) => state.user;
const getUserInfo = (state: RootState) => getUser(state).info;
const isAuthorized = (state: RootState) => getUserInfo(state) !== null;
const getUID = (state: RootState) => getUserInfo(state)?.uid;
const getDisplayName = (state: RootState) => getUserInfo(state)?.displayName;
const getPhotoURL = (state: RootState) => getUserInfo(state)?.photoURL;

const selectors = {
  isAuthorized,
  getUID,
  getDisplayName,
  getPhotoURL,
};

export const reducer = userSlice.reducer;

export const { signInSuccess, signOutSuccess } = userSlice.actions;

export default selectors;
