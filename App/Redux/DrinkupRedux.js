import { createReducer, createActions } from 'reduxsauce';
import _ from 'lodash';
import { requestingMember } from '../Fixtures/drinkupMembers';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  barRequest: ['barId'],
  barRequestSuccessful: ['bar'],
  barRequestFailure: ['error'],
  drinkupRequest: ['drinkupId'],
  drinkupRequestSuccessful: ['drinkup'],
  drinkupRequestFailure: ['error'],
  joinDrinkup: ['user'],
  startDrinkup: ['barId', 'user'],
  startDrinkupSuccessful: ['drinkup'],
  startDrinkupFailure: ['error'],
  leaveDrinkup: ['user'],
  clearDrinkupData: [],
  clearDrinkupUsers: [],
});

export const DrinkupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  joined: null,
  bar: null,
  users: null,
  fetching: false,
};

/* ------------- Reducers ------------- */

export const request = (state: Object) => Object.assign({}, state, {
  fetching: true,
});


export const barRequestSuccessful = (state: Object, { bar }) => Object.assign({},
  state,
  {
    fetching: false,
    bar,
  }
);

export const barRequestFailure = (state: Object, { error }) => Object.assign({},
  state,
  {
    fetching: false,
    bar: null,
    error,
  }
);

export const drinkupRequest = (state: Object) => Object.assign({}, state, {
  fetching: true,
});


export const drinkupRequestSuccessful = (state: Object, { drinkup: { users } }) => Object.assign({},
  state,
  {
    fetching: false,
    users,
  }
);

export const startDrinkupSuccessful = (state: Object, { drinkup: { users } }) => Object.assign({},
  state,
  {
    joined: true,
    fetching: false,
    users,
  }
);

export const drinkupRequestFailure = (state: Object, { error }) => Object.assign({},
  state,
  {
    fetching: false,
    users: null,
    error,
  }
);

export const joinDrinkup = (state: Object, { user }) => Object.assign({},
  state,
  {
    joined: true,
    users: Object.assign({}, state.users, { newUser: user }),
  }
);

export const leaveDrinkup = (state: Object, { user }) => Object.assign({},
  state,
  {
    joined: false,
    // only for demo draft.
    users: state.users,
  }
);

export const clearDrinkupUsers = (state: Object) => Object.assign({}, state, { users: null });

export const clearDrinkupData = () => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.BAR_REQUEST]: request,
  [Types.BAR_REQUEST_SUCCESSFUL]: barRequestSuccessful,
  [Types.BAR_REQUEST_FAILURE]: barRequestFailure,
  [Types.DRINKUP_REQUEST]: drinkupRequest,
  [Types.DRINKUP_REQUEST_SUCCESSFUL]: drinkupRequestSuccessful,
  [Types.DRINKUP_REQUEST_FAILURE]: drinkupRequestFailure,
  [Types.START_DRINKUP]: request,
  [Types.START_DRINKUP_SUCCESSFUL]: startDrinkupSuccessful,
  [Types.START_DRINKUP_FAILURE]: drinkupRequestFailure,
  [Types.JOIN_DRINKUP]: joinDrinkup,
  [Types.LEAVE_DRINKUP]: leaveDrinkup,
  [Types.CLEAR_DRINKUP_DATA]: clearDrinkupData,
  [Types.CLEAR_DRINKUP_USERS]: clearDrinkupUsers,
});
