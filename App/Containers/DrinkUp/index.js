import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';

import NavItems from '../../Navigation/NavItems';
import styles from '../Styles/BarScreenStyle';
import DrinkUpLobby from './DrinkUpLobbyScreen';
import ItsJustMe from './ItsJustMeScreen';
import DrinkupActions from '../../Redux/DrinkupRedux';
import DirectionsDialog from '../../Components/Dialogs/DirectionsDialog';

class DrinkUp extends Component {

  static propTypes = {
    barId: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      isDirectionDialogShowing: false,
    };
  }

  componentDidMount() {
    const barId = this.props.barId ? this.props.barId : this.props.bar.id;
    this.props.getBar(barId);

    if (this.props.bar && !this.props.users) {
      this.props.getUsers(this.props.bar.currentDrinkUp);
    }

    if (this.props.bar) {
      NavigationActions.refresh({
        title: this.props.bar.name,
        renderRightButton: NavItems.mapButton(this.showDirectionDialog),
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.bar && prevProps.bar && this.props.bar.id !== prevProps.bar.id) {
      NavigationActions.refresh({
        title: this.props.bar.name,
        renderRightButton: NavItems.mapButton(this.showDirectionDialog),
      });
    }
  }

  componentWillUnmount() {
    this.props.clearDrinkupUsers();
  }

  showDirectionDialog = () => {
    this.setState({ isDirectionDialogShowing: true });
  }

  closeDirectionDialog = () => {
    this.setState({ isDirectionDialogShowing: false });
  }

  renderScreen() {
    if (!this.props.users) {
      return null;
    }

    if (this.props.users && Object.keys(this.props.users).length > 1) {
      return <DrinkUpLobby />;
    }

    return <ItsJustMe />;
  }

  renderDirectionDialog() {
    return (
      <DirectionsDialog
        bar={this.props.bar}
        onClose={this.closeDirectionDialog}
        onGoogleMapsPress={this.closeDirectionDialog}
        onAppleMapsPress={this.closeDirectionDialog}
        visible={this.state.isDirectionDialogShowing}
      />
    );
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        {this.renderScreen()}
        {this.renderDirectionDialog()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.drinkup.users,
  bar: state.drinkup.bar,
});

//eslint-disable-next-line
const mapDispatchToProps = dispatch => ({
  getBar: barId => dispatch(DrinkupActions.barRequest(barId)),
  getUsers: drinkUpId => dispatch(DrinkupActions.drinkupRequest(drinkUpId)),
  clearDrinkupUsers: () => dispatch(DrinkupActions.clearDrinkupUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkUp);
