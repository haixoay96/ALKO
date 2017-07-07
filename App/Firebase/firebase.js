import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBqJCLuEb1KMoLBy5PBl0LOsC9JpMZKIWI',
  authDomain: 'alko-f7eb3.firebaseapp.com',
  databaseURL: 'https://alko-f7eb3.firebaseio.com',
  projectId: 'alko-f7eb3',
  storageBucket: 'alko-f7eb3.appspot.com',
  messagingSenderId: '815962169455',
};

const app = firebase.initializeApp(config);

export const firebaseDb = app.database();
