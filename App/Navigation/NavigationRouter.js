import React, { Component } from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import { Connect } from '../Redux';
import NavigationDrawer from './NavigationDrawer';
import NavItems from './NavItems';
import { slideLeft } from '../Themes/NavigationAnimations';

import SplashScreen from '../Containers/SplashScreen';

// Onboarding
import OnboardingStep1Screen from '../Containers/Onboarding/about-alko';
import OnboardingStep2Screen from '../Containers/Onboarding/alko-special';
import OnboardingStep3Screen from '../Containers/Onboarding/location-permission';
import OnboardingStep4Screen from '../Containers/Onboarding/push-notifications';

// Main
import MapScreen from '../Containers/MapScreen';
import JoinDrinkUp from '../Containers/JoinDrinkUp';
import DrinkUp from '../Containers/DrinkUp';
import Redeem2For1Screen from '../Containers/Redeem2For1Screen';
import SponsoredScreen from '../Containers/Secondary/SponsoredScreen';

// Drawer
import EditProfileScreen from '../Containers/Secondary/EditProfileScreen';
import PushNotificationsScreen from '../Containers/Secondary/PushNotificationsScreen';
import TermsOfServiceScreen from '../Containers/Legal/TermsOfServiceScreen';
import PrivacyPolicyScreen from '../Containers/Legal/PrivacyPolicyScreen';
import FeedbackScreen from '../Containers/Secondary/FeedbackScreen';

import NavBar from './NavBar';

class NavigationRouter extends Component {
  render() {
    return (
      <Router animationStyle={slideLeft}>
        <Scene key="drawer" component={NavigationDrawer}>
          <Scene key="drawerChildrenWrapper" navBar={NavBar}>
            <Scene initial key="splashScreen" type={ActionConst.RESET} component={SplashScreen} hideNavBar />
            <Scene key="onboard" type={ActionConst.RESET} >
              <Scene key="introStep1Screen" component={OnboardingStep1Screen} hideNavBar />
              <Scene key="introStep2Screen" component={OnboardingStep2Screen} hideNavBar />
              <Scene key="introStep3Screen" component={OnboardingStep3Screen} hideNavBar />
              <Scene key="introStep4Screen" component={OnboardingStep4Screen} hideNavBar />
            </Scene>

            <Scene
              key="map"
              type={ActionConst.RESET}
              component={MapScreen}
              title="ALKO"
              renderTitle={NavItems.brandTitle}
              renderLeftButton={NavItems.hamburgerButton(this.props.actions.openDrawer)}
            />

            <Scene
              key="joinDrinkUp"
              component={JoinDrinkUp}
              title="Join DrinkUp"
              renderLeftButton={NavItems.backButton}
            />

            <Scene
              key="drinkUp"
              type={ActionConst.RESET}
              component={DrinkUp}
              title="DrinkUp"
              renderLeftButton={NavItems.hamburgerButton(this.props.actions.openDrawer)}
            />

            <Scene
              key="editProfile"
              type={ActionConst.RESET}
              component={EditProfileScreen}
              title={I18n.t('Profile_Edit')}
            />

            <Scene
              key="pushNotifications"
              type={ActionConst.RESET}
              component={PushNotificationsScreen}
              title={I18n.t('PUSH_NOTIFICATIONS')}
              renderLeftButton={NavItems.hamburgerButton(this.props.actions.openDrawer)}
            />

            <Scene
              key="termsOfService"
              type={ActionConst.RESET}
              component={TermsOfServiceScreen}
              title={I18n.t('TERMS_OF_SERVICE')}
              renderLeftButton={NavItems.hamburgerButton(this.props.actions.openDrawer)}
            />

            <Scene
              key="privacyPolicy"
              type={ActionConst.RESET}
              component={PrivacyPolicyScreen}
              title={I18n.t('PRIVACY_POLICY')}
              renderLeftButton={NavItems.hamburgerButton(this.props.actions.openDrawer)}
            />

            <Scene
              key="feedback"
              type={ActionConst.RESET}
              component={FeedbackScreen}
              title={I18n.t('SEND_FEEDBACK')}
              renderLeftButton={NavItems.hamburgerButton(this.props.actions.openDrawer)}
            />

            <Scene
              key="sponsoredScreen"
              component={SponsoredScreen}
              renderLeftButton={NavItems.backButton}
            />

            <Scene
              key="redeem2for1Screen"
              component={Redeem2For1Screen}
              hideNavBar
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default Connect(NavigationRouter);
