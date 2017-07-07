import Permissions from 'react-native-permissions';
import FCM from 'react-native-fcm';

const requestPermission = (...args) => (
  new Promise((resolve, reject) => {
    Permissions
      .getPermissionStatus(...args)
      .then((response) => {

        console.tron.display({
          name: 'PermissionStatus',
          value: { args, response },
          important: true,
        });

        //  Access was already granted
        if (response === 'authorized') {
          return resolve();
        }

        //  (iOS only) blocked by parental controls
        if (response === 'restricted') {
          return reject();
        }

        Permissions
          .requestPermission(...args)
          .then((permissionResponse) => {

            console.tron.display({
              name: 'PermissionResponse',
              value: { args, permissionResponse },
              important: true,
            });

            if (permissionResponse === 'authorized') {
              console.track(`${args[0]}_permission_granted`);
              resolve();
            } else {
              console.track(`${args[0]}_permission_rejected`);
              reject();
            }

          })
          .catch(reject);

        return null;
      })
      .catch(reject);
  })
);

export const locationPermission = () => requestPermission('location', 'always');

export const notificationPermission = () => (
  new Promise((resolve, reject) => {
    requestPermission('notification')
      .then(() => {

        FCM.requestPermissions();

        FCM
          .getFCMToken()
          .then((token) => {

            console.tron.display({
              name: 'FCM Token',
              value: { token },
              important: true,
            });

            resolve(token);
          })
          .catch(reject);

      })
      .catch(reject);
  })
);
