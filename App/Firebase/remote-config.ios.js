import firestack from './firestack';

const RemoteConfig = firestack.remoteConfig;

export const fetch = (key, expiration = 86400) => (
  new Promise((resolve, reject) => (
    RemoteConfig
      .fetchWithExpiration(expiration)
      .then(() => RemoteConfig.config(key))
      .then(resolve)
      .catch(reject)
  ))
);
