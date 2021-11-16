import { createAction, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FlogData, FlogGeneratedData, FlogId } from 'types/flog';
import { RootState } from 'store';

export type AddFlogItemRequest = {
  data: Omit<FlogData, FlogGeneratedData>;
};

export type AddFlogItemSuccess = {
  id: FlogId;
};

export type UpdateFlogItemRequest = {
  id: FlogId;
  data: Omit<FlogData, FlogGeneratedData>;
};

export type UpdateFlogItemSuccess = {
  id: FlogId;
};

export type GetFlogItemsRequest = undefined;

export type GetFlogItemsSuccess = {
  items: FlogData[];
};

export type GetFlogItemRequest = {
  id: FlogId;
};

export type GetFlogItemSuccess = {
  item: FlogData;
};

export const addFlogItemRequest = createAction<AddFlogItemRequest>('flog/addFlogItemRequest');
export const addFlogItemSuccess = createAction<AddFlogItemSuccess>('flog/addFlogItemSuccess');

export const updateFlogItemRequest = createAction<UpdateFlogItemRequest>('flog/updateFlogItemRequest');
export const updateFlogItemSuccess = createAction<UpdateFlogItemSuccess>('flog/updateFlogItemSuccess');

export const getFlogItemsRequest = createAction<GetFlogItemsRequest>('flog/getFlogItemsRequest');
export const getFlogItemRequest = createAction<GetFlogItemRequest>('flog/getFlogItemRequest');

const flogAdapter = createEntityAdapter<FlogData>({
  selectId: (item) => item.id,
  // sortComparer: (a, b) => a.title.localeCompare(b.title),
})

const flogSlice = createSlice({
  name: 'flog',
  initialState: flogAdapter.getInitialState(),
  reducers: {
    getFlogItemsSuccess: (state, action: PayloadAction<GetFlogItemsSuccess>) => {
      const { payload } = action;
      const { items } = payload;

      flogAdapter.setAll(state, items);
    },
    getFlogItemSuccess: (state, action: PayloadAction<GetFlogItemSuccess>) => {
      const { payload } = action;
      const { item } = payload;

      flogAdapter.addOne(state, item);
    },
  }
});

const flogSelectors = flogAdapter.getSelectors<RootState>(state => state.flog);

const getItems = flogSelectors.selectAll;
const getItem = (state: RootState) => (id: FlogId) => getItems(state)?.find(i => i.id === id);

const selectors = {
  getItems,
  getItem,
};

export const reducer = flogSlice.reducer;

export const { getFlogItemsSuccess, getFlogItemSuccess } = flogSlice.actions;

export default selectors;
