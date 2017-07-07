import { call, put } from 'redux-saga/effects';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { eventChannel } from 'redux-saga';

import LocationActions from '../Redux/LocationRedux';
import bgGeolocationConfig from '../Config/BackgroundGeolocation';
import { watch } from '../Lib/SagaHelpers';

const watchBgGeolocationEvent = (eventName, action) => eventChannel((emit) => {
  const onResult = res => emit(action(res));
  BackgroundGeolocation.on(eventName, onResult);
  const unsubscribe = () => {
    BackgroundGeolocation.un(eventName);
  };
  return unsubscribe;
});

const startBgGeolocation = () => new Promise((resolve, reject) => {
  BackgroundGeolocation.start(resolve, reject);
});

const reconfigureBackgroundGeolocation = config => new Promise((resolve, reject) => {
  BackgroundGeolocation.setConfig(config, (bgLocationState) => {
    if (!bgLocationState.enabled) {
      startBgGeolocation()
        .then(resolve)
        .catch(reject);
    } else {
      resolve(bgLocationState);
    }
  }, reject);
});

const configureBackgroundGeolocation = config => new Promise((resolve, reject) => {
  BackgroundGeolocation.configure(config, (bgLocationState) => {
    if (!bgLocationState.enabled) {
      startBgGeolocation()
        .then(resolve)
        .catch(reject);
    }
  }, reject);
});

const getBackgroundLocationState = () => new Promise((resolve) => {
  BackgroundGeolocation.getState(resolve);
});

export function* startBackgroundGeolocationWatchers() {
  yield [
    // This event fires when movement states changes (stationary->moving; moving->stationary)
    call(watch, watchBgGeolocationEvent, 'motionchange', LocationActions.onMotionChange),
    // This event fires whenever bgGeo receives a location update.
    call(watch, watchBgGeolocationEvent, 'location', LocationActions.onLocationChange),
    // This event fires whenever bgGeo receives an error
    // call(watch, watchBgGeolocationEvent, 'error', LocationActions.onLocationError),
    // This event fires when a chnage in motion activity is detected
    call(watch, watchBgGeolocationEvent, 'activitychange', LocationActions.onActivityChange),
    // This event fires when the user toggles location-services
    call(watch, watchBgGeolocationEvent, 'providerchange', LocationActions.onProviderChange),
  ];
}

export function* startBackgroundGeolocation({ geolocationConfig = bgGeolocationConfig }) {
  try {
    let bgLocationState = yield call(getBackgroundLocationState, geolocationConfig);

    if (!bgLocationState) {
      bgLocationState = yield call(configureBackgroundGeolocation, geolocationConfig);
    }

    bgLocationState = yield call(reconfigureBackgroundGeolocation, geolocationConfig);

    yield put(LocationActions.startBackgroundGeolocationSuccess(bgLocationState.enabled));
  } catch (error) {
    yield put(LocationActions.startBackgroundGeolocationFailure(error));
  }
}
