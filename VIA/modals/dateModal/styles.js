/* eslint-disable no-unused-vars*/
import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
/* eslint-enable no-unused-vars*/
import { StyleSheet, Platform } from 'react-native';

const fontFamily = Platform.OS == 'ios' ? colorsProvider.font : colorsProvider.font;

const backgroundColor = colorsProvider.whiteColor;

module.exports = StyleSheet.create({


  /* #region Outer Structure */
  outerView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    justifyContent: 'center',
    alignContent: 'center',
  },
  outerViewDone: {
    flex: 2,
    flexDirection: 'column',
  },
  /* #endregion */

  datePickerView: {
  },

  /* #region  Top Navigation */
  topNav: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trashButton: {
    marginRight: '8%',
    justifyContent: 'center',
  },
  topNavBackButton: {
    marginLeft: '8%',
  },
  /* #endregion */

  /* #region  Bottom Buttons */
  bottomButtonsContainer: {
    paddingTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bottomButtonExtraButtonContainer: {
    paddingTop: 18,
    alignItems: 'center',
    marginBottom: 10,
  },
  bottomButtonExtraButton: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: colorsProvider.homeComplimentaryColor,
    justifyContent: 'center',
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: colorsProvider.shadow,
  },
  /* #endregion */

  /* #region Create Bottom Buttons Section */
  bottomButtonLeftDisabled: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colorsProvider.homePlaceholderColor,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: colorsProvider.shadow,
  },
  bottomButtonRight: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    // borderWidth: 2,
    // borderColor: colorsProvider.homeComplimentaryColor,
    backgroundColor: colorsProvider.whitePlaceholderColor,
    // alignContent: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: colorsProvider.shadow,
  },
  bottomButtonCenter: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colorsProvider.homeComplimentaryColor,
    backgroundColor: colorsProvider.homeComplimentaryColor,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: colorsProvider.shadow,
  },
  bottomButtonLeft: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: backgroundColor,
    marginRight: 50,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: colorsProvider.shadow,
  },
  bottomButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fontFamily,
  },
  /* #endregion */
});
