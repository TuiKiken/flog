import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { FlogData } from 'types/flog';

type FlogItem = {

};

type FlogSliceState = {
  items?: FlogItem[];
};

export type AddFlogRequest = {
  data: FlogData;
};

const initialState: FlogSliceState = {};

export const addFlogRequest = createAction<AddFlogRequest>('flog/addRequest');

const flogSlice = createSlice({
  name: 'flog',
  initialState,
  reducers: {

  }
});

const getFlog = (state: RootState) => state.flog;
const getFlogItems = (state: RootState) => getFlog(state).items;

const selectors = {
  getFlog,
  getFlogItems,
};

export const reducer = flogSlice.reducer;

export const { } = flogSlice.actions;

export default selectors;
