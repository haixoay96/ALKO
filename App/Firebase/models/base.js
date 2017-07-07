import _ from 'lodash';
import { firebaseDb } from '../index';

export default class Base {
  constructor(db, actions) {
    if (db) this.db = db;
    else this.db = firebaseDb;
    this.actions = actions;
    this._unsubscribers = {};
    this.populateProperties = {};
  }

  get unsubscribers() {
    return this._unsubscribers;
  }

  get actions() {
    return this._actions;
  }

  set actions(value) {
    this._actions = value;
  }

  get db() {
    return this._db;
  }

  set db(value) {
    this._db = value;
    return this;
  }

  get ref() {
    return this._ref;
  }

  set ref(value) {
    this._ref = value;
    return this;
  }

  populate(propertyName, populatedProperty, fn) {
    this.populateProperties[propertyName] = { populatedProperty, fn };
    return this;
  }

  dbRef(key = null) {
    return key ? this.db.ref(this.ref).child(key) : this.db.ref(this.ref);
  }

  get(key, appendKey = false) {
    return new Promise((resolve, reject) => {
      this.dbRef(key).once('value', (snapshot) => {
        if (key) {
          const result = snapshot.val();
          if (appendKey) result.id = snapshot.key;
          this.populateResult(result)
            .then(resolve)
            .catch(reject);
        } else {
          const promises = _.map(snapshot.val(), (value, id) => new Promise(innerResolve =>
            this.populateResult(value)
              .then(result => innerResolve([id, result]))
          ));
          Promise.all(promises)
            .then(_.fromPairs)
            .then(resolve)
            .catch(reject);
        }
      });
    });
  }

  set(key, value: Object) {
    return this.dbRef(key).set(value);
  }

  push(value: Object) {
    return this.dbRef().push(value);
  }

  update(key, diff) {
    return this.dbRef(key).update(diff);
  }

  remove(key) {
    return this.dbRef(key).remove();
  }

  exists(key) {
    return new Promise((resolve) => {
      this.dbRef(key).once('value', (snap) => {
        resolve(Boolean(snap.value));
      });
    });
  }

  subscribe(emit, key) {
    if (this.unsubscribers[key]) return false;

    let initialized = false;

    if (this.actions.onLoad) {
      this.dbRef(key).once('value', (snapshot) => {
        if (!key) {
          emit(this.actions.onLoad(snapshot.val()));
        } else {
          emit(this.actions.onLoad(snapshot.val(), snapshot.key));
        }
        // TODO: Avoid using setTimeout
        setTimeout(() => initialized = true, 1000);
      });
    }

    if (this.actions.onAdd) {
      this.dbRef(key).on('child_added', (snapshot) => {
        if (!initialized) return;
        if (!key) {
          emit(this.actions.onAdd(this.constructor.unwrapSnapshot(snapshot)));
        } else {
          emit(this.actions.onAdd(this.constructor.unwrapSnapshot(snapshot), key));
        }
      }).then(() => {}, () => {});
    }

    if (this.actions.onChange) {
      this.dbRef(key).on('child_changed', (snapshot) => {
        if (!key) {
          emit(this.actions.onChange(this.constructor.unwrapSnapshot(snapshot)));
        } else {
          emit(this.actions.onChange(this.constructor.unwrapSnapshot(snapshot), key));
        }
      }).then(() => {}, () => {});
    }

    if (this.actions.onRemove) {
      this.dbRef(key).on('child_removed', (snapshot) => {
        if (!key) {
          emit(this.actions.onRemove(this.constructor.unwrapSnapshot(snapshot), snapshot.key));
        } else {
          emit(this.actions.onRemove(this.constructor.unwrapSnapshot(snapshot), snapshot.key, key));
        }
      }).then(() => {}, () => {});
    }

    this._unsubscribers[key] = () => this.dbRef(key).off();
    return this.unsubscribers[key];
  }

  unsubscribe(key) {
    if (this.unsubscribers[key]) {
      this.unsubscribers[key]();
      delete this._unsubscribers[key];
    }
  }

  populateResult(value) {
    return new Promise((resolve, reject) => {
      const promises = _.map(this.populateProperties, ({ populatedProperty, fn }, propertyName) =>
        fn(value)
          .then((populatedResult) => {
            const diff = {};
            if (value[propertyName]) diff[populatedProperty] = populatedResult;
            return diff;
          })
          .catch(reject)
      );

      Promise.all(promises)
        .then((results) => {
          resolve(Object.assign({}, value, ...results));
        })
        .catch(reject);
    });
  }

  static unwrapSnapshot(snapshot) {
    const attr = snapshot.val();
    const diff = {};
    diff[snapshot.key] = attr;
    return diff;
  }
}
