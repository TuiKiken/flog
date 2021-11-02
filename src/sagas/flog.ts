import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Saga } from 'types/saga';
import { AddFlogRequest, addFlogRequest } from 'store/flog';
import { MESSAGE_TYPE, showMessageRequest } from 'store/message';
import { addFlogItem } from 'services/flog';

const addFlogRequestHandler: Saga<AddFlogRequest> = function* ({ payload }) {
  const { data } = payload;

  yield call(addFlogItem, data);
  yield put(showMessageRequest({
    type: MESSAGE_TYPE.SUCCESS,
    message: 'Отчёт о рыбалке добавлен',
  }));
}

export default function* root() {
  yield all([
    takeLatest(addFlogRequest, addFlogRequestHandler)
  ]);
}
