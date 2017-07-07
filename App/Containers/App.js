// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import FCM, { FCMEvent } from 'react-native-fcm';
import '../I18n/I18n'; // keep before root container
import RootContainer from './RootContainer';
import createStore from '../Redux';
import applyConfigSettings from '../Config';

// Apply config overrides
applyConfigSettings();
// create our store
const store = createStore();

class App extends Component {

  componentDidMount() {

    // this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
    //   console.tron.display({
    //     name: 'NotificationReceived',
    //     value: { notif },
    //     important: true,
    //   });
    //
    //   notif.finish();
    // });
    //
    // this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
    //   console.tron.display({
    //     name: 'FCM_TOKEN_REFRESH',
    //     value: { token },
    //     important: true,
    //   });
    // });

  }

  componentWillUnmount() {
    this.notificationListener.remove();
    this.refreshTokenListener.remove();
  }

  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

export default App;
