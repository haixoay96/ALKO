import { put, call } from 'redux-saga/effects';
import _ from 'lodash';

import DrinkupActions from '../Redux/DrinkupRedux';
import { Bar, DrinkUp } from '../Firebase/models';

const DRINKUP_USER_PROPERTIES = ['photoURL', 'firstName', 'icon']

export function* getBar({ barId }) {
  try {
    const drinkupBar = yield call([Bar, Bar.get], barId);
    drinkupBar.id = barId;
    yield put(DrinkupActions.barRequestSuccessful(drinkupBar));
  } catch (error) {
    yield put(DrinkupActions.barRequestFailure(error));
  }
}

export function* getDrinkup({ drinkupId }) {
  try {
    const drinkup = yield call([DrinkUp, DrinkUp.get], drinkupId);
    yield put(DrinkupActions.drinkupRequestSuccessful(drinkup));
  } catch (error) {
    yield put(DrinkupActions.drinkupRequestFailure(error));
  }
}

export function* startDrinkUp({ barId, user }) {
  try {
    const drinkup = {
      active: true,
      bar: barId,
      users: { [user.uid]: _.pick(user, DRINKUP_USER_PROPERTIES) },
    };
    const drinkupRef = yield call([DrinkUp, DrinkUp.push], drinkup);
    const drinkupSnap = yield call([drinkupRef, drinkupRef.once], 'value');
    yield call([Bar, Bar.update], barId, { currentDrinkUp: drinkupSnap.key });
    yield put(DrinkupActions.startDrinkupSuccessful(drinkupSnap.val()));
  } catch (error) {
    yield put(DrinkupActions.drinkupRequestFailure(error));
  }
}
