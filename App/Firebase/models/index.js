import { firebaseDb } from '../index';
import UserModel from './user';
import BarModel from './bar';
import DrinkUpModel from './drinkup';
import authActions from '../../Redux/AuthRedux';
import barsActions from '../../Redux/BarRedux';

const userActions = {
  onAdd: authActions.updateProfileFulfilled,
  onChange: authActions.updateProfileFulfilled,
  onLoad: authActions.getProfileFulfilled,
  onRemove: authActions.deleteProfileFulfilled,
};

const barActions = {
  onAdd: barsActions.barsRequestSuccess,
  onChange: barsActions.barsRequestSuccess,
  onLoad: barsActions.barsRequestSuccess,
  onRemove: barsActions.barsRequestSuccess,
};

export const UserFactory = (actions = userActions) => new UserModel(firebaseDb, actions);
export const BarFactory = (actions = barActions) => new BarModel(firebaseDb, actions);
export const DrinkUpFactory = (actions) => new DrinkUpModel(firebaseDb, actions);

export const User = new UserModel(firebaseDb, userActions);
export const Bar = new BarModel(firebaseDb, barActions);
export const DrinkUp = new DrinkUpModel(firebaseDb);
