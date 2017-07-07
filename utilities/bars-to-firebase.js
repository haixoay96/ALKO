#!../node_modules/.bin/babel-node

/* eslint-disable no-regex-spaces, quotes, no-throw-literal */

import _ from 'lodash';
import { parseLocation } from 'parse-address';
import { addTo, addLocationTo, updateObject, clear } from './database';
import DrinkUpGenerator from './generators/drink-up';
import bars from './data/bars.json';

const lists = ['bars', 'barLocations', 'drinkUps'];

const pClear = _.map(lists, l => clear(l));
Promise
  .all(pClear)
  .then(() => {

    bars.forEach((barData) => {
      console.log(barData.name);

      const bar = {};
      bar.name = barData.name;

      const rawAddress = parseLocation(barData.address.join(' '));

      bar.address = {
        latitude: barData.location.latitude,
        longitude: barData.location.longitude,
        address: `${rawAddress.number} ${rawAddress.prefix || ''} ${rawAddress.street} ${rawAddress.type}`.replace(/  +/, ' '),
        city: rawAddress.city,
        state: rawAddress.state,
        postal_code: rawAddress.zip,
        country: 'US',
      };

      if (_.random(2) === 1) {
        bar.special = {
          id: 'to-be-determied',
          until: '02:00',
        };
      }

      addTo('bars', bar)
        .then((id) => {

          const locationData = {
            id,
            location: bar.address,
          };

          addLocationTo('bars', locationData)
            .then(() => {})
            .catch(e => console.error('Failed to save bar location', e));

          if (_.random(100) < 30) {
            DrinkUpGenerator(bar)
              .then(({ id: drinkUpId }) => {

                bar.drink_up_id = drinkUpId;
                updateObject(`/bars/${bar.id}`, bar);

              })
              .catch(e => console.error('Failed to save Drink-up', e));
          }

        })
        .catch(e => console.error('Failed to add bar', e));

    });

  });
