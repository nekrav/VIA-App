/* eslint-disable no-unused-vars*/
import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
/* eslint-enable no-unused-vars*/
import {StyleSheet, Platform} from 'react-native';

const fontFamily = Platform.OS == 'ios' ? colorsProvider.font : colorsProvider.font;

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

    marginRight: 50,

    width: '90%',
  },
  titleText: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: fontFamily,
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
    borderColor: colorsProvider.homePlaceholderColor,
    backgroundColor: colorsProvider.homeMainColor,
    marginRight: 50,
    shadowColor: colorsProvider.shadowColor,
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
    borderColor: colorsProvider.homePlaceholderColor,
    backgroundColor: colorsProvider.homeMainColor,
    shadowColor: colorsProvider.shadowColor,
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
    backgroundColor: colorsProvider.homeMainColor,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: colorsProvider.homePlaceholderColor,
    backgroundColor: colorsProvider.homeMainColor,
    shadowColor: colorsProvider.shadowColor,
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
    backgroundColor: colorsProvider.homeMainColor,
  },

  checkboxText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fontFamily,
  },
  /* #endregion */
});
