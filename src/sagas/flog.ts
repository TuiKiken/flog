import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Saga } from 'types/saga';
import { addFlogItem, getFlogItem, getFlogItems } from 'services/flog';
import {
  AddFlogItemRequest,
  AddFlogItemSuccess,
  GetFlogItemsRequest,
  GetFlogItemRequest,
  addFlogItemRequest,
  addFlogItemSuccess,
  getFlogItemsRequest,
  getFlogItemsSuccess,
  getFlogItemRequest,
  getFlogItemSuccess,
} from 'store/flog';
import { MESSAGE_TYPE, showMessageRequest } from 'store/message';
import { history } from 'store';

const addFlogItemRequestHandler: Saga<AddFlogItemRequest> = function* ({ payload }) {
  const { data } = payload;

  const id = yield call(addFlogItem, data);
  yield put(showMessageRequest({
    type: MESSAGE_TYPE.SUCCESS,
    message: 'Отчёт о рыбалке добавлен',
  }));
  yield put(addFlogItemSuccess({ id }));
}

const addFlogItemSuccessHandler: Saga<AddFlogItemSuccess> = function* ({ payload }) {
  const { id } = payload;

  history.push(`/explore/?selected=${id}`);
}

const getFlogItemsRequestHandler: Saga<GetFlogItemsRequest> = function* () {
  const items = yield call(getFlogItems);

  yield put(getFlogItemsSuccess({ items }));
}

const getFlogItemRequestHandler: Saga<GetFlogItemRequest> = function* ({ payload }) {
  const { id } = payload;
  const item = yield call(getFlogItem, id);

  yield put(getFlogItemSuccess({ item }));
}

export default function* root() {
  yield all([
    takeLatest(addFlogItemRequest, addFlogItemRequestHandler),
    takeLatest(addFlogItemSuccess, addFlogItemSuccessHandler),
    takeLatest(getFlogItemsRequest, getFlogItemsRequestHandler),
    takeLatest(getFlogItemRequest, getFlogItemRequestHandler),
  ]);
}
