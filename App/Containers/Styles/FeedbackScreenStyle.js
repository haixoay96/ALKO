// @flow

import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics, ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  formContainer: {
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
  },

  prompt: {
    color: Colors.snow,
    fontFamily: Fonts.type.primary,
    fontSize: 15,
    lineHeight: 23,
    marginTop: Metrics.doubleBaseMargin,
  },

  textarea: {
    height: 180,
    borderColor: Colors.tundora,
    borderWidth: 1,
    borderRadius: 5,
    color: '#FFFFFF',
    fontFamily: Fonts.type.primary,
    marginTop: Metrics.doubleBaseMargin,
    paddingTop: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin * 1.5,
    paddingBottom: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin * 1.5,
    textAlignVertical: 'top',
  },

  button: {
    marginTop: Metrics.doubleBaseMargin,
  },

/*
  documentName: {
    textAlign: 'center',
    color: Colors.snow,
    fontSize: 16,
    fontFamily: Fonts.type.primary,
    marginBottom: Metrics.smallMargin,
  },

  updatedOn: {
    textAlign: 'center',
    color: Colors.brand.gray,
    fontSize: 12,
    fontFamily: Fonts.type.primary,
    marginBottom: Metrics.baseMargin,
  },

  header: {
    color: Colors.brand.orange,
    fontFamily: Fonts.type.primary,
    fontSize: 14,
    marginTop: Metrics.baseMargin,
  },

  body: {
    color: Colors.snow,
    fontFamily: Fonts.type.primary,
    fontSize: 12,
    lineHeight: 17,
  },

  spacer: {
    height: Metrics.baseMargin,
  },
*/
});
