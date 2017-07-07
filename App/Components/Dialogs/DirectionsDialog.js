import React, { Component, PropTypes } from 'react';
import { Linking, Platform, Text } from 'react-native';
import I18n from 'react-native-i18n';

import Button from '../Button';
import Dialog from '../Dialog';
import styles from '../Styles/DirectionsDialogStyle';

export default class DirectionsDialogWrapper extends Component {

  static propTypes = {
    bar: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {
    visible: false,
  }

  componentWillReceiveProps = (newProps) => {

    if (this.props.visible || !newProps.visible) {
      this.setState({ visible: false });
      return;
    }

    if (!this.props.visible && newProps.visible) {
      this.setState({ visible: true });
    }

    if (Platform.OS === 'ios') {
      this.checkForGoogleMaps();
    } else {
      this.openGoogleMaps();
    }
  }

  getGoogleMapsURL() {
    const { bar } = this.props;
    const { address: { city, state } } = bar;
    return `comgooglemaps://?q=${bar.name}, ${city} ${state}`;
  }

  getAppleMapsURL() {
    const { bar } = this.props;
    const { address: { city, state } } = bar;
    return `http://maps.apple.com/?q=${bar.name}, ${city} ${state}`;
  }

  checkForGoogleMaps = () => {
    Linking
      .canOpenURL('comgooglemaps://')
      .then((isSupported) => {
        if (isSupported) {
          this.setState({ visible: true });
        } else {
          this.setState({ visible: false });
          this.openAppleMaps();
        }
      });
  }

  openGoogleMaps = () => {
    const googleMapsURL = this.getGoogleMapsURL();
    Linking.openURL(googleMapsURL);
  }

  openAppleMaps = () => {
    const appleMapsURL = this.getAppleMapsURL();
    Linking.openURL(appleMapsURL);
  }

  render = () => (
    <DirectionsDialog
      unmount={this.handleChildUnmount}
      openGoogleMaps={this.openGoogleMaps}
      openAppleMaps={this.openAppleMaps}
      visible={this.state.visible}
      onClose={this.props.onClose}
    />
  )

}

// eslint-disable-next-line react/no-multi-comp
class DirectionsDialog extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    openGoogleMaps: PropTypes.func.isRequired,
    openAppleMaps: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  render= () => (
    <Dialog
      closeButton
      closeOnBackdropPress
      onClose={this.props.onClose}
      visible={this.props.visible}
    >

      <Text style={styles.title}>{I18n.t('Drinkup_NeedDirection')}</Text>

      <Button
        style={styles.button}
        onPress={this.props.openGoogleMaps}
        text={I18n.t('Drinkup_GoogleMap')}
      />

      <Button
        style={styles.button}
        onPress={this.props.openAppleMaps}
        text={I18n.t('Drinkup_AppleMap')}
      />

    </Dialog>
  )

}
