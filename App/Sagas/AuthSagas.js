import { call, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { Actions as NavigationActions } from 'react-native-router-flux';

import authActions from '../Redux/AuthRedux';
import { firebaseAuth, firebaseStorage } from '../Firebase';
import { User } from '../Firebase/models';
import { watch } from '../Lib/SagaHelpers';

function subscribe(key) {
  return eventChannel(emit => User.subscribe(emit, key));
}

export function* signIn() {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.signInAnonymously]);
    yield put(authActions.signInFulfilled(authData));
  } catch (error) {
    yield put(authActions.signInFailed(error));
  }
}

export function* signOut() {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.getCurrentUser]);
    yield call([User, User.unsubscribe], authData.user.uid);
    yield call([User, User.remove], authData.user.uid);
    yield put(authActions.signOutFulfilled());
  } catch (error) {
    yield put(authActions.signOutFailed(error));
  }
}

export function* signOutSuccess() {
  yield call([NavigationActions, NavigationActions.onboard]);
}

export function* getOrCreateProfile() {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.getCurrentUser]);
    const userExists = yield call([User, User.exists], authData.user.uid);
    if (userExists) {
      yield put(authActions.getProfile(authData));
    } else {
      yield put(authActions.createProfile(authData));
    }
  } catch (error) {
    yield put(authActions.getProfileFailed(error));
  }
}

export function* getProfile() {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.getCurrentUser]);
    yield call(watch, subscribe, authData.user.uid);
  } catch (error) {
    yield put(authActions.getProfileFailed(error));
  }
}

export function* createProfile() {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.getCurrentUser]);
    yield call([User, User.set], authData.user.uid, { uid: authData.user.uid });
    yield put(authActions.createProfileFulfilled());
    yield call(watch, subscribe, authData.user.uid);
  } catch (error) {
    yield put(authActions.createProfileFailed(error));
  }
}

export function* updateProfile({ diff }) {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.signInAnonymously]);
    yield call([User, User.update], authData.user.uid, diff);
  } catch (error) {
    yield put(authActions.updateProfileFailed(error));
  }
}

export function* uploadProfilePhoto({ photo }) {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.signInAnonymously]);
    const storageOpts = { contentType: 'image/jpeg', contentEncoding: 'base64' };
    const filename = photo.path.replace(/^.*[\\/]/, '');
    const storagePath = `photos/${authData.user.uid}/${filename}`;

    const res = yield call([firebaseStorage, firebaseStorage.uploadFile], storagePath, photo.path, storageOpts);
    yield call([User, User.update], authData.user.uid, { photoURL: res.downloadUrl });
    yield put(authActions.uploadProfilePhotoFulfilled());
  } catch (error) {
    yield put(authActions.uploadProfilePhotoFailed(error));
  }
}
