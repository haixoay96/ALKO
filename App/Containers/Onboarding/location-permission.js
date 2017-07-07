import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import styles from '../Styles/OnboardingScreenStyle';
import Button from '../../Components/Button';
import { locationPermission } from '../../Lib/PermissionsHelper';

export default class OnboardingLocationPermission extends Component {

  requestLocationPermission = () => {
    locationPermission()
      .then(() => {
        console.tron.display({
          name: 'LocationPermissionAccepted',
          value: {},
          important: true,
        });
        NavigationActions.introStep4Screen();
      })
      .catch((e) => {

        // console.tron.display({
        //   name: 'LocationPermissionError',
        //   value: e.message,
        //   important: true,
        // });

        // just for development, we will change this alert dialog later
        Alert.alert(
          'Location data permissions',
          'Your device does not support location services.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Continue', onPress: NavigationActions.introStep4Screen },
          ]
        );
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{I18n.t('Introduction_step3_title')}</Text>
            <Text style={styles.description}>{I18n.t('Introduction_step3_description')}</Text>
          </View>
        </ScrollView>
        <View styles={styles.footer}>
          <Button onPress={this.requestLocationPermission} text={I18n.t('Introduction_step3_btn')} />
        </View>
      </View>
    );
  }

}
