import { all, call, takeEvery } from 'redux-saga/effects';
import { MESSAGE_TYPE, ShowMessageRequest, showMessageRequest } from '../store/message';
import { Saga } from '../types/saga';
import { message as antdMessage } from 'antd';

const showMessageRequestHandler: Saga<ShowMessageRequest> = function* ({ payload }) {
  const { type, message } = payload;

  switch (type) {
    case MESSAGE_TYPE.SUCCESS:
      yield call(antdMessage.success, message);
      break;
    case MESSAGE_TYPE.WARNING:
      yield call(antdMessage.warning, message);
      break;
    case MESSAGE_TYPE.ERROR:
      yield call(antdMessage.error, message);
      break;
  }

}

export default function* root() {
  yield all([
    takeEvery(showMessageRequest, showMessageRequestHandler),
  ]);
}
