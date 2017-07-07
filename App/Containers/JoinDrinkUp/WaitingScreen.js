import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Actions as NavigationActions } from 'react-native-router-flux';

import styles from '../Styles/DrinkupScreenStyle';
import Button from '../../Components/Button';
import Banner from '../../Components/Banner';
import AvatarList from '../../Components/AvatarList';
import DrinkupActions from '../../Redux/DrinkupRedux';
import { requestingMember } from '../../Fixtures/drinkupMembers';

class WaitingScreen extends Component {

  static propTypes = {
    users: PropTypes.object,
    column: PropTypes.number,
    columnPadding: PropTypes.number,
    joined: PropTypes.bool,
    joinDrinkup: PropTypes.func,
  }

  static defaultProps = {
    column: 3,
    columnPadding: 15,
  }

  constructor(...props) {
    super(...props);

    this.state = {
      waiting: false,
      isDirectionDialogShowing: false,
      user: null,
      joiningUser: requestingMember, // only use for demo
    };
  }

  componentDidMount() {
    if (!this.props.bar) this.props.getBar(this.props.barId);
    else if (this.props.bar.currentDrinkUp) this.props.getDrinkup(this.props.bar.currentDrinkUp);
  }

  componentDidUpdate() {
    if (this.props.joined) {
      NavigationActions.drinkUp({ barId: this.props.bar.id });
    }
    if (this.props.bar && this.props.bar.currentDrinkUp && !this.props.users) this.props.getDrinkup(this.props.bar.currentDrinkUp);
  }

  // this function is only use for demo
  onDraftJoined = () => {
    this.props.joinDrinkup(requestingMember);
  }

  onWaiting = () => {
    this.setState({ waiting: true });
  }

  onCancel = () => {
    this.setState({ waiting: false });
  }

  render() {
    const { bar: { currentSpecial }, users } = this.props;
    const { waiting } = this.state;
    return (
      <View style={[styles.mainContainer, styles.container]}>

        {currentSpecial ? (
          <Banner theme="info" text={I18n.t('Drinkup_JoinDrinkUpAndGet2For1Drinks')} onPress={this.onWaiting} />
        ) : null}

        <AvatarList users={users} iconOnly />

        {waiting ? (
          <View>
            <Animatable.View animation="fadeIn" delay={1000} duration={500}>
              <Button theme={'disallow'} onPress={this.onCancel} text={I18n.t('Drinkup_CancelRequest')} />
            </Animatable.View>
            <TouchableOpacity onPress={this.onDraftJoined}>
              <Text style={styles.waitingInviteText}>{I18n.t('Drinkup_WaitingInvite')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Button onPress={this.onWaiting} text={I18n.t('Drinkup_JoinDrinkUp')} />
        )}

      </View>
    );
  }
}

const mapStateToProps = state => ({
  joined: state.drinkup.joined,
  users: state.drinkup.users,
  bar: state.drinkup.bar,
});

//eslint-disable-next-line
const mapDispatchToProps = dispatch => ({
  getBar: barId => dispatch(DrinkupActions.barRequest(barId)),
  getDrinkup: drinkupId => dispatch(DrinkupActions.drinkupRequest(drinkupId)),
  joinDrinkup: user => dispatch(DrinkupActions.joinDrinkup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitingScreen);
