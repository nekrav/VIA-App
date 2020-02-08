/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import {StyleSheet, PixelRatio, Platform} from 'react-native';
const buttonBackgroundColor = '#3a506b';
const titleFontSize = 24;
const bodyFontSize = 20;
const buttonFontSize = 20;
const leftMargin = 5;
const fontFamily = Platform.OS == 'ios' ? 'Roboto-Medium' : 'Roboto-Medium';

const backgroundColor = '#ffffff';
const blueColor = '#00bbb1';
const textColor = '#2d3142';
const finishedBackgroundColor = '#a8ffe0';
const grayColor = '#ededed';
const placeholderColor = '#ABABAB';
const homeColorButton = '#48A2F8';

module.exports = StyleSheet.create({
  outerView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* #region  Title Scetion */
  titleView: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: blueColor,
    backgroundColor: blueColor,
    marginRight: 50,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    width: '90%',
  },
  titleText: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: fontFamily,
    color: backgroundColor,
  },
  /* #endregion */

  /* #region Close Bottom Buttons Section */
  bottomButtonContainer: {
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

  /* #region  Items Container Section */
  itemsContainerView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  itemsContainer: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: placeholderColor,
    backgroundColor: backgroundColor,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    marginLeft: 5,
    marginRight: 5,
  },
  itemText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fontFamily,
  },
  /* #endregion */

  /* #region  Selection Item container */
  selectionItemContainer: {
    backgroundColor: backgroundColor,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: placeholderColor,
    backgroundColor: backgroundColor,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    marginRight: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },

  selectionItemButtonsContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  /* #endregion */

  /* #region  Item selection checkbox */

  itemSelectionContainer: {
    borderWidth: 0,
    justifyContent: 'flex-start',
    backgroundColor: backgroundColor,
  },

  checkboxText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fontFamily,
  },
  /* #endregion */
});
