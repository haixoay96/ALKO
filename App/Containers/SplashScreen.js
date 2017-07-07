import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';

import { User } from '../Firebase/models';
import { Connect } from '../Redux';

class SplashScreen extends Component {

  componentDidMount() {
    this.props.actions.startBackgroundGeolocation();
  }

  componentDidUpdate() {
    this.redirect();
  }

  redirect() {
    const { joined, user, isUserValid } = this.props;
    if (!user) {
      NavigationActions.onboard();
    } else if (!isUserValid && user.onboardingComplete && Object.keys(user).length > 0) {
      NavigationActions.editProfile();
    } else if (joined) {
      NavigationActions.drinkUp();
    } else if (isUserValid) {
      NavigationActions.map();
    } else {
      NavigationActions.onboard();
    }

  }

  render() {
    return (
      <View></View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.profile,
  joined: state.drinkup.joined,
  isUserValid: User.isUserValid(state.auth.profile),
});

export default Connect(SplashScreen, mapStateToProps);
