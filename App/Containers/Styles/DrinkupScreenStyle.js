// @flow

import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    flex: 1,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.largeMargin,
    backgroundColor: Colors.brand.dark,
  },

  waitingInviteText: {
    marginTop: Metrics.largeMargin,
    color: Colors.brand.orange,
    fontFamily: Fonts.type.primary,
    fontSize: Fonts.size.h5,
    textAlign: 'center',
  },

  name: {
    color: Colors.snow,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.primary,
    marginBottom: Metrics.baseMargin,
  },

  message: {
    color: Colors.brand.gray,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.primary,
  },

});
