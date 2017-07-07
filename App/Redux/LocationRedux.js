import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startBackgroundGeolocation: ['geolocationConfig'],
  startBackgroundGeolocationSuccess: ['geolocationEnabled'],
  startBackgroundGeolocationFailure: ['error'],
  stopBackgroundGeolocation: [],
  stopBackgroundGeolocationSuccess: ['enabled'],
  stopBackgroundGeolocationFailure: ['error'],
  onLocationChange: ['location'],
  onLocationError: ['error'],
  onMotionChange: ['motion'],
  onActivityChange: ['activity'],
  onProviderChange: ['provider'],
});

export const LocationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  geolocationEnabled: false,
  lastLocationTimestamp: null,
  isMoving: false,
  activity: null,
  coords: null,
  provider: null,
  fetching: null,
  error: null,
};

/* ------------- Reducers ------------- */

export const request = state => Object.assign({}, state, { fetching: true });

export const startBackgroundGeolocationSuccess = (state, { geolocationEnabled }) => Object.assign({}, state, { geolocationEnabled, error: null, fetching: false });

export const stopBackgroundGeolocationSuccess = (state, { geolocationEnabled }) => Object.assign({}, state, { geolocationEnabled, error: null, fetching: false });

export const onLocationChange = (state, { location }) => Object.assign({}, state, {
  activity: location.activity.type,
  coords: location.coords,
  isMoving: location.is_moving,
  lastLocationTimestamp: location.timestamp,
  error: null,
});

export const onActivityChange = (state, { activity }) => Object.assign({}, state, { activity, error: null });

export const onProviderChange = (state, { provider }) => Object.assign({}, state, { provider, error: null });

export const onMotionChange = (state, { motion }) => Object.assign({}, state, {
  activity: motion.location.activity.type,
  coords: motion.location.coords,
  isMoving: motion.isMoving,
  lastLocationTimestamp: motion.location.timestamp,
  error: null,
});

export const failure = (state, { error }) => Object.assign({}, state, { fetching: false, coords: null, error });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_BACKGROUND_GEOLOCATION]: request,
  [Types.START_BACKGROUND_GEOLOCATION_SUCCESS]: startBackgroundGeolocationSuccess,
  [Types.START_BACKGROUND_GEOLOCATION_FAILURE]: failure,
  [Types.STOP_BACKGROUND_GEOLOCATION]: request,
  [Types.STOP_BACKGROUND_GEOLOCATION_SUCCESS]: stopBackgroundGeolocationSuccess,
  [Types.STOP_BACKGROUND_GEOLOCATION_FAILURE]: failure,
  [Types.ON_LOCATION_CHANGE]: onLocationChange,
  [Types.ON_LOCATION_ERROR]: failure,
  [Types.ON_MOTION_CHANGE]: onMotionChange,
  [Types.ON_ACTIVITY_CHANGE]: onActivityChange,
  [Types.ON_PROVIDER_CHANGE]: onProviderChange,
});
