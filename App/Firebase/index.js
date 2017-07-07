import GeoFire from 'geofire';
import firestack from './firestack';
import { firebaseDb as firebaseJsDb } from './firebase';

export { default as FirebaseList } from './firebase-list';

export const firebaseAuth = firestack.auth;
export const firebaseDb = firestack.database;
export const firebaseAnalytics = firestack.analytics;
export const firebaseMessaging = firestack.messaging;
export const firebaseStorage = firestack.storage;

export const geoFire = key => new GeoFire(firebaseJsDb.ref(key));
