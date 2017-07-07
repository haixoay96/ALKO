import Base from './base';

export default class DrinkUp extends Base {
  constructor(db, actions) {
    super(db, actions);
    this.ref = 'drinkUps';
  }
}
