import { eventChannel } from 'redux-saga';
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

import { Saga } from 'types/saga';
import { AUTH_PROVIDER } from 'constants/auth';
import { MESSAGE_TYPE, showMessageRequest } from 'store/message';
import { SignInRequest, signInRequest, signInSuccess, signOutRequest, signOutSuccess } from 'store/user';

const getProvider = (providerType: AUTH_PROVIDER) => {
  switch (providerType) {
    case AUTH_PROVIDER.google:
    default:
      return GoogleAuthProvider;
  }
}

enum AUTH_EVENT_TYPE {
  SIGN_IN,
  SIGN_OUT,
}

const getAuthEventsChannel = () => {
  const auth = getAuth();

  return eventChannel((emitter) =>
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;
        emitter({
          type: AUTH_EVENT_TYPE.SIGN_IN,
          data: { uid, displayName, photoURL },
        });
      }

      if (!user) {
        emitter({
          type: AUTH_EVENT_TYPE.SIGN_OUT,
        });
      }
    })
  );
};

const authObserver: Saga = function* () {
  const authEventsChannel = getAuthEventsChannel();

  while (true) {
    const authEvents = yield take(authEventsChannel);
    const { type, data } = authEvents;

    if (type === AUTH_EVENT_TYPE.SIGN_IN) {
      yield put(signInSuccess(data));
    }

    if (type === AUTH_EVENT_TYPE.SIGN_OUT) {
      yield put(signOutSuccess());
    }
  }
}

const signInRequestHandler: Saga<SignInRequest> = function* ({ payload }) {
  const { provider } = payload;
  const auth = yield call(getAuth);
  const AuthProvider = getProvider(provider);

  try {
    yield call(signInWithPopup, auth, new AuthProvider());
  } catch (error) {
    yield put(showMessageRequest({
      type: MESSAGE_TYPE.ERROR,
      message: 'Ошибка авторизации',
    }));
    console.error('Auth error:', error);
  }
}

const signOutRequestHandler: Saga = function* () {
  const auth = yield call(getAuth);

  yield call(signOut, auth);
}

export default function* root() {
  yield all([
    fork(authObserver),
    takeLatest(signInRequest, signInRequestHandler),
    takeLatest(signOutRequest, signOutRequestHandler),
  ]);
};
