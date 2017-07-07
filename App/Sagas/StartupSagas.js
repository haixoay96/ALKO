import { call, put, select } from 'redux-saga/effects';
import { is } from 'ramda';

import { firebaseAuth, firebaseDb } from '../Firebase';
import authActions from '../Redux/AuthRedux';

// process STARTUP actions

function initAuth() {
  return new Promise((resolve, reject) => {
    firebaseAuth.listenForAuth((evt) => {
      if (!evt.authenticated) {
        // There was an error or there is no user
        reject(evt.error);
      } else {
        // evt.user contains the user details
        resolve(evt.user);
      }
      firebaseAuth.unlistenForAuth();
    });
  });
}

/* eslint no-unused-vars: 0 */
export function* startup(action) {
  try {
    const authData = yield call(initAuth);
    yield put(authActions.signInFulfilled(authData));
  } catch (err) {
    try {
      yield put(authActions.signIn());
    } catch (err) {
      yield put(authActions.signInFailed(err));
    }
  }
}
