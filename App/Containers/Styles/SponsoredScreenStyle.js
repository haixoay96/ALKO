// @flow

import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Fonts, Colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    flex: 1,
    paddingHorizontal: Metrics.largeMargin,
    paddingTop: Metrics.doubleBaseMargin,
  },

  header: {
    color: Colors.brand.orange,
    fontFamily: Fonts.type.primary,
    fontSize: 17,
    marginTop: Metrics.baseMargin,
  },

  body: {
    color: Colors.snow,
    fontFamily: Fonts.type.primary,
    fontSize: 14,
    lineHeight: 22,
  },

  spacer: {
    height: Metrics.baseMargin,
  },

});
