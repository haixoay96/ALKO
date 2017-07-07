import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

import styles from './Styles/BarResultStyle';
import { Images } from '../Themes/';

export default class Button extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    name: PropTypes.string,
    activeDrinkUp: PropTypes.bool,
    activeSpecial: PropTypes.bool,
    distance: PropTypes.string,
    onPress: PropTypes.func,
  }

  static renderBarIcon(activeDrinkUp, activeSpecial) {

    if (!activeDrinkUp && !activeSpecial) {
      return null;
    }

    if (activeDrinkUp && activeSpecial) {
      return <Image style={styles.icon} source={Images.mugSeal} />;
    }

    if (activeSpecial) {
      return <Image style={styles.icon} source={Images.seal} />;
    }

    return <Image style={styles.icon} source={Images.mug} />;

  }

  render() {
    const { name, activeDrinkUp, activeSpecial, distance, textStyle, onPress } = this.props;

    const buttonStyles = [styles.btnContainer, this.props.style];
    if (activeDrinkUp) buttonStyles.push(styles.btnActiveDrinkUp);

    console.show(name, this.props);

    return (
      <TouchableOpacity activeOpacity={0.7} style={buttonStyles} onPress={onPress}>
        <View style={styles.container}>
          {this.constructor.renderBarIcon(activeDrinkUp, activeSpecial)}
          <View style={styles.infoContainer}>
            <Text style={[styles.btnText, textStyle]}>{name}</Text>
            <Text style={[styles.btnText, textStyle]}>{distance}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
