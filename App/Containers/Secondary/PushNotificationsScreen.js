import React, { Component } from 'react';
import { Switch, Text, View } from 'react-native';
import I18n from 'react-native-i18n';
import { Colors } from '../../Themes/';

import { Connect } from '../../Redux';
import Styles from '../Styles/PushNotificationsScreenStyle';

const days = [
  { key: 'sun', name: I18n.t('SUNDAY') },
  { key: 'mon', name: I18n.t('MONDAY') },
  { key: 'tue', name: I18n.t('TUESDAY') },
  { key: 'wed', name: I18n.t('WEDNESDAY') },
  { key: 'thu', name: I18n.t('THURSDAY') },
  { key: 'fri', name: I18n.t('FRIDAY') },
  { key: 'sat', name: I18n.t('SATURDAY') },
];

class PushNotificationsScreen extends Component {

  constructor(props) {
    super(props);

    const { profile } = this.props.auth;
    const pushNotifications = profile.pushNotifications || {};
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

  render() {
    const { pushNotifications } = this.state;

    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.formContainer}>

          <View style={Styles.topSection}>
            <Text style={Styles.description}>{I18n.t('Introduction_step4_description')}</Text>
          </View>

          <View>
            {days.map(day =>
              <View key={day.key} style={Styles.settingRow}>
                <Text style={Styles.settingName}>{day.name}</Text>
                <Text style={[
                  Styles.switcherStatus,
                  pushNotifications[day.key] ? null : Styles.switcherStatusOff,
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
            )}
          </View>

        </View>
      </View>
    );
  }

}

export default Connect(PushNotificationsScreen);
