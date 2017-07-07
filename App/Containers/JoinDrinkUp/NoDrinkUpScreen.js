import React, { Component } from 'react';
import { Text, View } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';

import Styles from '../Styles/BarScreenStyle';
import Button from '../../Components/Button';
import Banner from '../../Components/Banner';
import DrinkupActions from '../../Redux/DrinkupRedux';
import { requestingMember } from '../../Fixtures/drinkupMembers';

class NoDrinkUpScreen extends Component {

  componentDidUpdate() {
    if (this.props.joined) {
      NavigationActions.drinkUp();
    }
  }

  // this function is only use for demo
  onDraftJoined = () => {
    this.props.startDrinkup(this.props.bar.id, this.props.user);
  }

  render() {
    const { special } = this.props;

    return (
      <View style={Styles.mainContainer}>
        {special &&
          <Banner
            theme="info"
            text={I18n.t('Bar_StartADrinkUpForSpecial')}
            style={Styles.banner}
            onPress={this.onDraftJoined}
          />
        }

        <View style={Styles.contentContainer}>

          <View style={Styles.section}>
            <Text style={Styles.header}>{I18n.t('Bar_OkayLetsDoThis_Header')}</Text>
            <Text style={Styles.body}>{I18n.t('Bar_OkayLetsDoThis_Body')}</Text>
          </View>

          {special &&
            <View style={Styles.section}>
              <Text style={Styles.header}>{I18n.t('Bar_WheresMyTwoForOne_Header')}</Text>
              <Text style={Styles.body}>{I18n.t('Bar_WheresMyTwoForOne_Body')}</Text>
            </View>
          }

        </View>
        <View style={Styles.footer}>
          <Button onPress={this.onDraftJoined} text={I18n.t('Bar_StartADrinkUp')} />
        </View>
      </View>
    );
  }

}


const mapStateToProps = state => ({
  joined: state.drinkup.joined,
  bar: state.drinkup.bar,
  user: state.auth.profile,
});

const mapDispatchToProps = dispatch => ({
  startDrinkup: (barId, user) => dispatch(DrinkupActions.startDrinkup(barId, user)),
  joinDrinkup: user => dispatch(DrinkupActions.joinDrinkup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoDrinkUpScreen);
