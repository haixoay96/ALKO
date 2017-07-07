import _ from 'lodash';
import { addTo } from '../database';

import UserGenerator from './user';

export default function (bar) {
  return new Promise((resolve) => {

    const drinkUp = {};

    drinkUp.bar_id = bar.id;

    const userCount = 1 + _.random(8);
    const pUsers = _.times(userCount, UserGenerator);
    Promise
      .all(pUsers)
      .then((result) => {

        drinkUp.users = {};
        _.forEach(result, ({ id, user }) => {
          drinkUp.users[id] = _.assign(user, { id });
        });

        addTo('drinkUps', drinkUp)
          .then(id => resolve({ id, drinkUp }))
          .catch(e => console.error('Unable to persist drink-up', e));

      })
      .catch(e => console.error('Unable to persist drink-ups', e));

  });
}
