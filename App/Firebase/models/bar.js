import _ from 'lodash';
import { getDistance } from 'geolib';
import Base from './base';

export default class Bar extends Base {
  constructor(db, actions) {
    super(db, actions);
    this.ref = 'bars';

  }

  static getBarsLocations(bars) {
    return _.map(bars, (bar) => {
      const { latitude, longitude } = bar.address;
      return { latitude, longitude };
    });
  }

  static getBarsSortedByDistance(locationCoords, bars, asc = true) {
    const barDistances = {};

    _.each(bars, (bar, key) => {
      const { latitude, longitude, accuracy } = locationCoords;
      const start = { latitude, longitude };
      barDistances[key] = bar.address ? getDistance(start, bar.address, accuracy) : 0;
    });

    const barDistancePairs = _.sortBy(_.toPairs(barDistances), x => x[1]);
    if (!asc) barDistancePairs.reverse();

    const sortedBars = _.mapValues(_.fromPairs(barDistancePairs), (bar, id) => bars[id]);
    return sortedBars;

  }

}
