import { put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import BarActions from '../Redux/BarRedux';
import { Bar, BarFactory } from '../Firebase/models';
import { watch } from '../Lib/SagaHelpers';

const BAR_CACHE = {};

const MAP_BAR_ACTIONS = {
  onAdd: BarActions.updateBar,
  onChange: BarActions.updateBar,
  onLoad: BarActions.addBarSuccess,
  onRemove: BarActions.removeBarProperty,
};

function barSubscribe(MapBar, key) {
  return eventChannel(emit => MapBar.subscribe(emit, key));
}

export function* getBars() {
  try {
    // Left as population example
    // Bar.populate('currentDrinkUp', 'currentDrinkUp', bar => new Promise((resolve, reject) => {
    //   if (!bar.currentDrinkUp) resolve({});
    //
    //   DrinkUp.get(bar.currentDrinkUp, true)
    //     .then(resolve)
    //     .catch(reject);
    // }));
    const bars = yield call([Bar, Bar.get]);
    yield put(BarActions.barsRequestSuccess(bars));
  } catch (error) {
    yield put(BarActions.barsRequestFailure(error));
  }
}

export function* addBar({ barId }) {
  try {
    const MapBar = BarFactory(MAP_BAR_ACTIONS);
    let bar = BAR_CACHE[barId];
    if (!bar) {
      bar = yield call([Bar, Bar.get], barId);
      BAR_CACHE[barId] = bar;
    }

    if (Object.keys(bar).length > 0) {
      yield call([MapBar, MapBar.unsubscribe], barId);
      yield call(watch, barSubscribe, MapBar, barId);
    }

  } catch (error) {
    yield put(BarActions.addBarFailure(error));
  }
}
