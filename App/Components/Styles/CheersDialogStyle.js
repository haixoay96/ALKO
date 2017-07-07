// @flow

import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  title: {
    color: Colors.snow,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.primary,
    marginBottom: Metrics.baseMargin,
    textAlign: 'center',
  },
  imageWrapper: {
    height: 0,
  },
  overlay: {
    height: 100,
    marginBottom: Metrics.doubleBaseMargin,
  },
  image: {
    width: Metrics.screenWidth - 140,
    height: 100,
  },
});
