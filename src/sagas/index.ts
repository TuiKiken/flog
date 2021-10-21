import { all, call } from 'redux-saga/effects';

import user from './user';

export default function* root() {
  yield all([
    call(user),
  ]);
};
