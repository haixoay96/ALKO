import _ from 'lodash';
import moment from 'moment';
import faker from 'faker';
import { addTo } from '../database';

export default function () {
  return new Promise((resolve) => {
    const user = {};

    user.firstName = faker.name.firstName();
    user.icon = _.sample(['beer', 'martini', 'tumbler', 'wine-glass', 'margarita']);

    const gender = _.sample(['men', 'women']);
    const index = _.random(100);
    user.avatars = {
      md: `https://randomuser.me/api/portraits/${gender}/${index}.jpg`,
    };

    const time = moment();
    user.arrived_at = time.format('YYYY-MM-DDTHH:mm:ssZ');
    user.joined_at = moment().add(2, 'minutes').format('YYYY-MM-DDTHH:mm:ssZ');

    addTo('users', user)
      .then(id => resolve({ id, user }))
      .catch(e => console.error('Unable to persist user', e));

  });
}
