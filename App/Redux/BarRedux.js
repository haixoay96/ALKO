import { createReducer, createActions } from 'reduxsauce';
import _ from 'lodash';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  barsRequest: [],
  barsRequestSuccess: ['bars'],
  barsRequestFailure: ['error'],
  addBar: ['barId'],
  addBarSuccess: ['bar', 'barId'],
  addBarFailure: ['error'],
  updateBar: ['bar', 'barId'],
  removeBar: ['barId'],
  removeBarProperty: ['value', 'name', 'barId'],
  clearBars: [],
});

export const BarTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  bars: {},
  fetching: false,
  error: null,
};

/* ------------- Reducers ------------- */
export const request = (state: Object) => Object.assign({}, state, {
  fetching: true,
});

export const barsRequestSuccess = (state: Object, { bars }) => Object.assign({}, state, {
  fetching: false,
  bars,
});

export const barsRequestFailure = (state: Object, { error }) => Object.assign({}, state, {
  bars: null,
  fetching: false,
  error,
});

export const updateBar = (state: Object, { bar, barId }) => {
  const updatedBar = Object.assign({}, state.bars[barId], bar);
  if (Object.keys(updatedBar).length <= 0) {
    return Object.assign({}, state, {
      bars: _.omit(state.bars, barId),
    });
  }

  return Object.assign({}, state, {
    bars: Object.assign({}, state.bars, {
      [barId]: Object.assign({}, state.bars[barId], bar),
    }),
  });
};

export const addBarFailure = (state: Object, { error }) => Object.assign({}, state, {
  fetching: false,
  error,
});

export const removeBar = (state: Object, { barId }) => Object.assign({}, state, {
  bars: _.omit(state.bars, barId),
});

export const clearBars = (state: Object) => Object.assign({}, state, { bars: {} });

// eslint-disable-next-line
export const removeBarProperty = (state: Object, { value, name, barId }) => {
  const updatedBar = _.omit(state.bars[barId], name);

  if (Object.keys(updatedBar).length <= 0) {
    return Object.assign({}, state, {
      bars: _.omit(state.bars, barId),
    });
  }

  return Object.assign({}, state, {
    bars: Object.assign({}, state.bars, {
      [barId]: _.omit(state.bars[barId], name),
    }),
  });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.BARS_REQUEST]: request,
  [Types.BARS_REQUEST_SUCCESS]: barsRequestSuccess,
  [Types.BARS_REQUEST_FAILURE]: barsRequestFailure,
  [Types.ADD_BAR]: request,
  [Types.ADD_BAR_SUCCESS]: updateBar,
  [Types.ADD_BAR_FAILURE]: addBarFailure,
  [Types.UPDATE_BAR]: updateBar,
  [Types.REMOVE_BAR]: removeBar,
  [Types.REMOVE_BAR_PROPERTY]: removeBarProperty,
  [Types.CLEAR_BARS]: clearBars,
});
