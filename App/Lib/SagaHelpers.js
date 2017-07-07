/* eslint-disable no-constant-condition */
import { call, put, take } from 'redux-saga/effects';

export function* watch(subscribe, ...params) {
  const channel = yield call(subscribe, ...params);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
