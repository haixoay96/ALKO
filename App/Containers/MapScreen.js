import React, { Component } from 'react';
import { View, ScrollView, Image, Platform, Text } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { getDistance } from 'geolib';
import I18n from 'react-native-i18n';
import _ from 'lodash';

import { geoFire } from '../Firebase';
import { Colors, Images } from '../Themes';
import { calculateRegion } from '../Lib/MapHelpers';
import MapCallout from '../Components/MapCallout';
import BarResult from '../Components/BarResult';
import Button from '../Components/Button';
import Banner from '../Components/Banner';
import Styles from './Styles/MapScreenStyle';
import IconAlko from '../Components/IconAlko';
import { Bar } from '../Firebase/models';
import { LocationActions, AlertActions, BarActions, DrinkupActions } from '../Redux';
let GoogleAPIAvailability;

if (Platform.OS === 'android') {
  //eslint-disable-next-line
  GoogleAPIAvailability = require('react-native-google-api-availability-bridge');
}

const METRES_TO_MILES_FACTOR = 0.000621371192237;
const SCROLL_FREE_TIME = 10000;
const ANIMATE_TO_REGION_TIME = 1000;

const test_DATE = new Date();

class MapScreen extends Component {

  /* ***********************************************************
  * This example is only intended to get you started with the basics.
  * There are TONS of options available from traffic to buildings to indoors to compass and more!
  * For full documentation, see https://github.com/lelandrichardson/react-native-maps
  *************************************************************/

  constructor(props) {
    super(props);

    /* ***********************************************************
    * STEP 1
    * Set the array of locations to be displayed on your map. You'll need to define at least
    * a latitude and longitude as well as any additional information you wish to display.
    *************************************************************/


    /* ***********************************************************
    * STEP 2
    * Set your initial region either by dynamically calculating from a list of locations (as below)
    * or as a fixed point, eg: { latitude: 123, longitude: 123, latitudeDelta: 1, longitudeDelta: 1}
    *************************************************************/

    this.state = {
      animatingToRegion: false,
      followUserOnMap: true,
      showUserLocation: true,
      isGooglePlayServicesAvailable: true,
      event: null,
    };

    this.geoQuery = geoFire('barLocations')
                      .query({
                        center: props.region ? [props.region.latitude, props.region.longitude]
                                             : [50, -50],
                        radius: 1,
                      });

    this.onBarEntered = this.geoQuery.on('key_entered', (barId) => {
      this.props.addBar(barId);
    });

    this.onBarExited = this.geoQuery.on('key_exited', (barId) => {
      this.props.removeBar(barId);
    });
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.props.clearBars();
    if (GoogleAPIAvailability) {
      GoogleAPIAvailability.checkGooglePlayServices((result) => {
        this.setState({ isGooglePlayServicesAvailable: result === 'success' });
      });
    }
  }

  componentWillReceiveProps(newProps) {
    /* ***********************************************************
    * STEP 3
    * If you wish to recenter the map on new locations any time the
    * Redux props change, do something like this:
    *************************************************************/

    // if (this.map && this.state.followUserOnMap) {
    //   this.setState({ animatingToRegion: true }, () => {
    //     this.map.animateToRegion(calculateRegion([newProps.location], { latPadding: 0.016, longPadding: 0.008 }), ANIMATE_TO_REGION_TIME);
    //     setTimeout(() => this.setState({ animatingToRegion: false }), ANIMATE_TO_REGION_TIME + 500);
    //   });
    // }

  }

  componentDidUpdate(prevProps) {
    if (this.props.drinkupBar && prevProps.drinkupBar !== this.props.drinkupBar) {
      NavigationActions.joinDrinkUp({ barId: this.props.drinkupBar.id });
    }
  }

  componentWillUnmount() {
    this.props.clearBars();
    this.geoQuery.cancel();
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  onRegionChange = (newRegion) => {
    /* ***********************************************************
    * STEP 4
    * If you wish to fetch new locations when the user changes the
    * currently visible region, do something like this:
    *************************************************************/
    this.geoQuery.updateCriteria({
      center: [newRegion.latitude, newRegion.longitude],
      radius: 1,
    });

    // if (!this.state.animatingToRegion) {
    //   this.setState({ followUserOnMap: false });
    //   setTimeout(() => {
    //     this.setState({ followUserOnMap: true });
    //   }, SCROLL_FREE_TIME);
    // }
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  scalloutPress(location) {
    /* ***********************************************************
    * STEP 5
    * Configure what will happen (if anything) when the user
    * presses your callout.
    *************************************************************/
    console.tron.log(location);
  }

  handleAlertPress = (alert) => {
    this.props.markAlertAsRead(alert);
    const { title, content } = alert;
    NavigationActions.sponsoredScreen({ title, content });
  }

  handleEventPress = (bar) => {
    const title = bar.name;
    NavigationActions.sponsoredScreen({ bar, title });
  }

  renderAlert = () => {
    const alerts = Object.entries(this.props.alerts);
    //eslint-disable-next-line
    const alertToDisplay = alerts.find(([alertId, alert]) => alert.read === false);
  }

  renderAlert() {
    const { bar } = this.state;

    if (!bar) {
      return null;
    }

    return (
      <Banner
        theme="alert"
        text={bar.event.title}
        iconFamily="alko"
        iconName="badge"
        onPress={() => this.handleEventPress(bar)}
      />
    );
  }

  renderBarMarker = (bar, id) => {
    /* ***********************************************************
    * STEP 6
    * Customize the appearance and location of the map marker.
    * Customize the callout in ../Components/MapCallout.js
    *************************************************************/
    if (!bar || !this.props.region) {
      return null;
    }

    const { address, currentDrinkUp, currentSpecial } = bar;

    if (!address) {
      return null;
    }

    let image = '';
    if (currentDrinkUp && currentSpecial) {
      image = Images.pinMugSeal;
    } else if (currentDrinkUp) {
      image = Images.pinMug;
    } else if (currentSpecial) {
      image = Images.pinSeal;
    } else {
      image = Images.pin;
    }

    return (
      <MapView.Marker key={id} coordinate={{ latitude: address.latitude, longitude: address.longitude }}>
        <Image source={image} />
        <MapCallout location={address} onPress={this.calloutPress} />
      </MapView.Marker>
    );
  }

  renderBarResult = (bar, id) => {
    const { name, currentDrinkUp, currentSpecial, address } = bar;

    const props = {
      name,
      activeDrinkUp: Boolean(currentDrinkUp),
      activeSpecial: Boolean(currentSpecial),
      key: id,
      onPress: () => this.props.setDrinkupBar(Object.assign({}, bar, { id })),
    };

    if (this.props.location && address) {
      const { latitude, longitude, accuracy } = this.props.location;
      const start = {
        latitude,
        longitude,
      };
      const distance = getDistance(start, address, accuracy);
      props.distance = `${(distance * METRES_TO_MILES_FACTOR).toFixed(2)}mi`;
    } else {
      props.distance = '';
    }

    return <BarResult {...props} />;
  }

  renderBarResults = () => {
    if (!this.props.bars) {
      return null;
    }

    console.show('bars', this.props.bars);

    return (
      _.map(this.props.bars, (bar, id) => this.renderBarResult(bar, id))
    );

  }

  renderBarMarkers = () => {
    if (!this.props.bars) {
      return null;
    }

    return (
      _.map(this.props.bars, (bar, id) => this.renderBarMarker(bar, id))
    );

  }

  renderMap() {
    if (!this.state.isGooglePlayServicesAvailable) {
      return (
        <View style={Styles.noMapContainer}>
          <IconAlko name="map" color={Colors.snow} size={48} style={Styles.noMapIcon} />
          <Text style={Styles.noMapText}>{I18n.t('Map_GoogleMapsNotAvailable')}</Text>
          <Button
            theme="dark"
            style={Styles.noMapButton}
            text={'Update'}
            onPress={() => GoogleAPIAvailability.openGooglePlayUpdate()}
          />
        </View>
      );
    }

    return (
      <MapView
        style={Styles.map}
        initialRegion={this.props.region}
        onRegionChangeComplete={this.onRegionChange}
        showsUserLocation={this.state.showUserLocation}
        ref={(ref) => { this.map = ref; }}
      >
        {this.renderBarMarkers()}
      </MapView>
    );
  }

  render() {
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.mapContainer}>
          {this.renderMap()}
          <View style={Styles.bannerContainer}>
            {this.renderAlert()}
          </View>
        </View>

        <ScrollView style={Styles.barListContainer}>
          {this.renderBarResults()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  region: state.location.coords && calculateRegion([state.location.coords], { latPadding: 0.016, longPadding: 0.008 }),
  bars: state.location.coords && Bar.constructor.getBarsSortedByDistance(state.location.coords, state.bar.bars),
  alerts: state.alert.alerts,
  profile: state.auth.profile,
  location: state.location.coords,
  drinkupBar: state.drinkup.bar,
});

//eslint-disable-next-line
const mapDispatchToProps = dispatch => ({
  getAlerts: () => dispatch(AlertActions.alertsRequest()),
  clearBars: () => dispatch(BarActions.clearBars()),
  addBar: barId => dispatch(BarActions.addBar(barId)),
  removeBar: barId => dispatch(BarActions.removeBar(barId)),
  markAlertAsRead: alert => dispatch(AlertActions.markAlertAsRead(alert)),
  setDrinkupBar: bar => dispatch(DrinkupActions.barRequestSuccessful(bar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
