/* eslint-disable no-param-reassign */
import admin from 'firebase-admin';
import GeoFire from 'geofire';

import ALKOFirebase from './alko-firebase-config.json';

admin.initializeApp({
  credential: admin.credential.cert(ALKOFirebase),
  databaseURL: `https://${ALKOFirebase.project_id}.firebaseio.com`,
});

const firebaseDB = admin.database();
export default firebaseDB;

export function addTo(list, object) {
  return new Promise((resolve, reject) => {
    const listRef = firebaseDB.ref(list);
    const newObjectRef = listRef.push();
    object.id = newObjectRef.key;
    newObjectRef
      .set(object)
      .then(() => resolve(object.id))
      .catch(reject);
  });
}

export function clear(list) {
  return firebaseDB.ref(list).remove();
}

export function addLocationTo(list, { id, location }) {
  const listLocationsRef = firebaseDB.ref(`${list.slice(0, -1)}Locations`);
  const geoFire = new GeoFire(listLocationsRef);
  const { latitude, longitude } = location;
  return geoFire.set(id, [latitude, longitude]);
}

export function updateObject(path, diff) {
  return firebaseDB.ref(path).set(diff);
}
