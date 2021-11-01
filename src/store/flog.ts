import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { PrepareAction } from 'types/redux';
import { FlogData, FlogFormData } from 'types/flog';

type FlogItem = {

};

type FlogSliceState = {
  items?: FlogItem[];
};

type AddFlogRequestOrigin = {
  data: FlogFormData;
};

export type AddFlogRequest = {
  data: FlogData;
};

export const addFlogRequest = createAction<PrepareAction<AddFlogRequestOrigin, AddFlogRequest>>(
  'flog/addRequest',
  ({ data }) => ({
    payload: {
      data: {
        ...data,
        date: data.date?.toISOString() ?? null,
        time: [
          data.time?.[0]?.toISOString() ?? null,
          data.time?.[1]?.toISOString() ?? null,
        ],
        water_temp: data.water_temp ? Number(data.water_temp) : null,
        bigfish_weight: Number(data.bigfish_weight),
        total_weight: Number(data.total_weight),
      },
    },
  })
);

const initialState: FlogSliceState = {};

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
