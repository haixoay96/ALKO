// @flow

import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';

import { User } from '../Firebase/models';
import AuthActions, { reducer as auth } from './AuthRedux';
import DrawerActions, { reducer as drawer } from './DrawerRedux';
import LocationActions, { reducer as location } from './LocationRedux';
import AlertActions, { reducer as alert } from './AlertRedux';
import DrinkupActions, { reducer as drinkup } from './DrinkupRedux';
import BarActions, { reducer as bar } from './BarRedux';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    alert,
    auth,
    drawer,
    location,
    bar,
    drinkup,
  });

  return configureStore(rootReducer, rootSaga);
};

const mapDispatchToProps = dispatch => ({
  actions: {
    signOut: () => dispatch(AuthActions.signOut()),
    signIn: () => dispatch(AuthActions.signIn()),
    updateProfile: diff => dispatch(AuthActions.updateProfile(diff)),
    uploadProfilePhoto: photo => dispatch(AuthActions.uploadProfilePhoto(photo)),

    openDrawer: () => dispatch(DrawerActions.openDrawer()),
    closeDrawer: () => dispatch(DrawerActions.closeDrawer()),
    setActivePage: page => dispatch(DrawerActions.setActivePage(page)),
    startBackgroundGeolocation: () => dispatch(LocationActions.startBackgroundGeolocation()),
  },
});

export function Connect(component, mapStateToProps) {
  if (!mapStateToProps) {
    // eslint-disable-next-line no-param-reassign
    mapStateToProps = state => ({
      auth: state.auth,
      isUserValid: User.isUserValid(state.auth.profile),
    });
  }
  return connect(mapStateToProps, mapDispatchToProps)(component);
}

export { AuthActions };
export { DrawerActions };
export { AlertActions };
export { LocationActions };
export { DrinkupActions };
export { BarActions };
