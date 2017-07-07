import _ from 'lodash';
import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import { Connect } from '../../Redux';
import Button from '../../Components/Button';
import * as SelectPhoto from '../../Lib/ProfilePhoto';
import Styles from '../Styles/EditProfileScreenStyle';
import { Colors, DrinkIcons } from '../../Themes';
import PicPhotoSourceDialog from '../../Components/Dialogs/PicPhotoSourceDialog';
import { User } from '../../Firebase/models';
import NavItems from '../../Navigation/NavItems';

const avatar = require('../../Images/avatar-dark.png');

class EditProfileScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: props.user.firstName,
      showPicDialog: false,
    };
  }

  componentDidMount() {
    NavigationActions.refresh({
      renderLeftButton: this.props.isUserValid ? NavItems.hamburgerButton(this.props.actions.openDrawer) : null,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isUserValid !== this.props.isUserValid) {
      NavigationActions.refresh({
        renderLeftButton: this.props.isUserValid ? NavItems.hamburgerButton(this.props.actions.openDrawer) : null,
      });
    }
  }

  onFirstNameChange = (e) => {
    this.setState({
      firstName: e.nativeEvent.text,
    });
  }

  onSelectIcon = icon => this.props.actions.updateProfile({ icon })

  doShowPicDialog = () => {
    const { uploadProfilePhoto } = this.props.actions;

    const opts = { width: 512, height: 512, cropping: true };

    SelectPhoto
      .openPicker(opts)
      .then(uploadProfilePhoto)
      .catch(this.isNotLoading);

  }

  saveProfile = () => {
    const { updateProfile } = this.props.actions;
    const { firstName } = this.state;

    updateProfile({
      firstName,
    });
  }

  saveProfileDelayed = _.debounce(this.saveProfile, 1000);

  doCompleteOnboarding = () => {
    this.props.actions.updateProfile({
      onboardingComplete: true,
    });

    NavigationActions.map();
  }

  render() {
    const { user, isProfileComplete, fetching } = this.props;
    const { firstName, showPicDialog } = this.state;
    const opacity = fetching ? 0.3 : 1.0;

    let source = avatar;
    if (user.photoURL) {
      source = { uri: user.photoURL };
    }

    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.formContainer}>
          <View style={Styles.selectPhotoContainer}>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.doShowPicDialog}
            >
              <Image
                source={source}
                onLoadStart={this.isLoading}
                onLoadEnd={this.isNotLoading}
                style={[Styles.photo, { opacity }]}
              />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={this.doChoosePhoto}>
              <Text style={Styles.updatePhoto}>{I18n.t('Profile_TapToAddPhoto').toUpperCase()}</Text>
            </TouchableOpacity>

          </View>

          <View style={Styles.labelContainer}>
            <Text
              style={Styles.label}
            >
              {I18n.t('Profile_FirstName')}
            </Text>
            <TextInput
              style={Styles.input}
              value={firstName}
              autoCorrect={false}
              maxLength={15}
              returnKeyType="done"
              onChange={this.onFirstNameChange}
              onChangeText={this.saveProfileDelayed}
              underlineColorAndroid={Colors.transparent}
              selectionColor={Colors.brand.clear.orange}
            />
          </View>

          <View style={Styles.spacer} />

          <View style={Styles.labelContainer}>
            <Text
              style={Styles.label}
            >
              {I18n.t('Profile_FavoriteDrink')}
            </Text>
          </View>

          <View style={Styles.iconContainer}>
            {_.map(DrinkIcons, (img, icon) => (
              <TouchableOpacity
                key={icon}
                activeOpacity={0.7}
                onPress={this.onSelectIcon.bind(null, icon)}
                style={Styles.iconButton}
              >
                <Image
                  source={img}
                  style={[Styles.drinkIcon, {
                    width: 64,
                    height: 64,
                    opacity: icon === user.icon ? 1.0 : 0.4,
                  }]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {(!user.onboardingComplete) &&
            <View style={Styles.footer}>
              <Text style={Styles.incompleteProfileText}>{I18n.t('Profile_IncompleteWarning')}</Text>
              <Button
                theme={isProfileComplete ? 'primary' : 'disallow'}
                disabled={!isProfileComplete}
                text={I18n.t('Introduction_getStarted')}
                onPress={this.doCompleteOnboarding}
              />
            </View>
          }

          {(user.onboardingComplete && !isProfileComplete) &&
            <View style={Styles.footer}>
              <Text style={Styles.incompleteProfileText}>{I18n.t('Profile_IncompleteWarning')}</Text>
            </View>
          }

        </View>

        {showPicDialog ? (
          <PicPhotoSourceDialog
            visible={showPicDialog}
            onClose={() => this.setState({ showPicDialog: false })}
            onUsePhotosPress={this.doSelectPhoto('Picker')}
            onUseCameraPress={this.doSelectPhoto('Camera')}
          />
        ) : null}

      </View>
    );
  }

}

const mapStateToProps = state => ({
  fetching: state.auth.fetching,
  user: state.auth.profile,
  isProfileComplete: User.constructor.isProfileComplete(state.auth.profile),
  isUserValid: User.isUserValid(state.auth.profile),
});

export default Connect(EditProfileScreen, mapStateToProps);
