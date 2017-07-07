import React, { Component } from 'react';
import { Alert, Text, ScrollView, Switch, View } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import { Connect } from '../../Redux';
import Button from '../../Components/Button';
import styles from '../Styles/OnboardingScreenStyle';
import { notificationPermission } from '../../Lib/PermissionsHelper';
import { Colors } from '../../Themes/';

const days = [
  { key: 'sun', name: I18n.t('SUNDAY') },
  { key: 'mon', name: I18n.t('MONDAY') },
  { key: 'tue', name: I18n.t('TUESDAY') },
  { key: 'wed', name: I18n.t('WEDNESDAY') },
  { key: 'thu', name: I18n.t('THURSDAY') },
  { key: 'fri', name: I18n.t('FRIDAY') },
  { key: 'sat', name: I18n.t('SATURDAY') },
];

class OnboardingPushNotifications extends Component {

  constructor() {
    super();

    const pushNotifications = {};
    days.forEach(({ key }) => pushNotifications[key] = true);
    this.state = { pushNotifications };
  }

  doUpdateDay = (day, on) => {
    this.setState(state => ({
      pushNotifications: Object.assign({
        [day]: on,
      }, state.pushNotifications),
    }));

    const { pushNotifications } = this.state;
    pushNotifications[day] = !!on;
    this.props.actions.updateProfile({ pushNotifications });
  }

  doNotificationPermissionRequest = () => (
    notificationPermission()
      .then((token) => {

        console.tron.display({
          name: 'NotificationPermissionAccepted',
          value: { token },
          important: true,
        });

        this.props.actions.updateProfile({ fcm_token: token });

        this.doCompleteProfile();
      })
      .catch((e) => {

        console.tron.display({
          name: 'NotificationPermissionError',
          value: e.message,
          important: true,
        });

        // just for development, we will change this alert dialog later
        Alert.alert(
          'Notification permissions',
          'Your device does not support notification services.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Continue', onPress: this.doCompleteProfile },
          ]
        );
      })
  )

  doCompleteProfile = () => {
    const { updateProfile } = this.props.actions;
    const { pushNotifications } = this.state;

    updateProfile({
      pushNotifications,
    });

    NavigationActions.editProfile();
  }

  render() {
    const { pushNotifications } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.topSection}>
          <Text style={styles.sectionTitle}>{I18n.t('Introduction_step4_title')}</Text>
          <Text style={styles.description}>{I18n.t('Introduction_step4_description')}</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {days.map(day => (
            <View key={day.key} style={styles.settingRow}>
              <Text style={styles.settingName}>{day.name}</Text>
              <Text style={[
                styles.switcherStatus,
                pushNotifications[day.key] ? null : styles.switcherStatusOff,
              ]}
              >
                {pushNotifications[day.key] ? I18n.t('ON') : I18n.t('OFF')}
              </Text>
              <Switch
                value={pushNotifications[day.key]}
                onTintColor={Colors.brand.orange}
                onValueChange={v => this.doUpdateDay(day.key, v)}
              />
            </View>
          ))}
        </ScrollView>

        <View>
          <Button
            text={I18n.t('Introduction_step4_disallow')}
            theme="disallow"
            onPress={this.doCompleteProfile}
            style={styles.firstButton}
          />
          <Button
            text={I18n.t('Introduction_step4_btn')}
            onPress={this.doNotificationPermissionRequest}
          />
        </View>

      </View>
    );
  }
}

export default Connect(OnboardingPushNotifications);
