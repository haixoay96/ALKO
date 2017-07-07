import Base from './base';

export default class User extends Base {
  constructor(db, actions) {
    super(db, actions);
    this.ref = 'users';
  }

  static isProfileComplete(user) {
    return Boolean(user
                   && user.photoURL
                   && user.firstName
                   && user.firstName.length > 0
                   && user.icon);
  }

  isUserValid(user) {
    return Boolean(user
                   && user.onboardingComplete
                   && this.constructor.isProfileComplete(user));
  }

}
