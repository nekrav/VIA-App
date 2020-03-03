/* eslint-disable no-unused-vars*/
import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
/* eslint-enable no-unused-vars*/
import {StyleSheet, PixelRatio, Dimensions, Platform} from 'react-native';

const buttonBackgroundColor = '#3a506b';
const titleFontSize = 24;
const bodyFontSize = 20;
const buttonFontSize = 20;
const leftMargin = 5;
const fontFamily = Platform.OS == 'ios' ? colorProvider.font : colorProvider.font;

const backgroundColor = '#ffffff';
const blueColor = '#00bbb1';
const textColor = '#2d3142';
const finishedBackgroundColor = '#a8ffe0';
const grayColor = '#ededed';
const placeholderColor = '#ABABAB';
const homeColorButton = '#48A2F8';

const {width, height} = Dimensions.get('window');

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
    backgroundColor: finishedBackgroundColor,
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
  /* #endregion */

  /* #region Create Bottom Buttons Section */
  bottomButtonsContainer: {
    paddingTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bottomButtonLeftDisabled: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: placeholderColor,
    // backgroundColor: placeholderColor,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  bottomButtonLeft: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    // borderWidth: 2,
    // borderColor: blueColor,
    backgroundColor: blueColor,
    // alignContent: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  bottomButtonCenter: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: blueColor,
    backgroundColor: blueColor,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  bottomButtonRight: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: placeholderColor,
    backgroundColor: backgroundColor,
    marginRight: 50,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  bottomButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fontFamily,
  },
  /* #endregion */
});
