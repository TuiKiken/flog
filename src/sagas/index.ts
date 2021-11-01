import { all, call } from 'redux-saga/effects';

import message from './message';
import user from './user';
import flog from './flog';

export default function* root() {
  yield all([
    call(message),
    call(user),
    call(flog),
  ]);
};
