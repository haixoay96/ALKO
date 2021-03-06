// @flow
import React, { Component } from 'react';
import { ScrollView, Image, BackAndroid, View, Text, TouchableOpacity } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import { Connect } from '../Redux';
import DrawerButton from '../Components/DrawerButton';
import styles from './Styles/DrawerContentStyle';

const avatar = require('../Images/avatar.png');

class DrawerContent extends Component {

  static defaultProps = {
    profile: {
      name: '',
    },
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer();
        return true;
      }
      return false;
    });
  }

  onLogout = () => {
    this.props.actions.signOut();
    // Just to test onboard multiple times
    setTimeout(() => this.toggleDrawer(), 500);
    setTimeout(() => this.props.actions.signIn(), 1500);
  }

  toggleDrawer = () => {
    this.context.drawer.toggle();
  }

  navigateTo = page => () => {
    this.props.actions.setActivePage(page);
    NavigationActions[page]();
    this.props.actions.closeDrawer();
  }

  render = () => {
    const { auth: { profile }, active, joined } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>

          <View style={styles.avatarContainer}>
            {profile.photoURL ? (
              <Image
                source={{ uri: profile.photoURL }}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={avatar}
                style={styles.avatar}
              />
            )}
          </View>

          <Text style={styles.name}>
            {profile.firstName}
          </Text>

        </View>
        <ScrollView style={styles.contentContainer}>

          {joined ? (
            <DrawerButton
              isActive={active === 'drinkUp'}
              text={I18n.t('DRINK_UP')}
              onPress={this.navigateTo('drinkUp')}
              iconFamily="alko"
              iconName="mug"
            />
          ) : (
            <DrawerButton
              isActive={active === 'map'}
              text={I18n.t('BARS')}
              onPress={this.navigateTo('map')}
            />
          )}

          <DrawerButton
            isActive={active === 'editProfile'}
            text={I18n.t('PROFILE')}
            onPress={this.navigateTo('editProfile')}
          />

          <DrawerButton
            isActive={active === 'pushNotifications'}
            text={I18n.t('PUSH_NOTIFICATIONS')}
            onPress={this.navigateTo('pushNotifications')}
          />

          <DrawerButton
            isActive={active === 'termsOfService'}
            text={I18n.t('TERMS_OF_SERVICE')}
            onPress={this.navigateTo('termsOfService')}
          />

          <DrawerButton
            isActive={active === 'privacyPolicy'}
            text={I18n.t('PRIVACY_POLICY')}
            onPress={this.navigateTo('privacyPolicy')}
          />

          <DrawerButton
            isActive={active === 'feedback'}
            text={I18n.t('SEND_FEEDBACK')}
            onPress={this.navigateTo('feedback')}
          />

        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.onLogout}>
            <Text style={styles.copyright}>© 2017 ALKO</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  active: state.drawer.page,
  joined: state.drinkup.joined,
});

export default Connect(DrawerContent, mapStateToProps);
