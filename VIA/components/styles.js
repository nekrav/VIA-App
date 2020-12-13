/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, Platform } from 'react-native';
import * as colorsProvider from '../components/colorsProvider';
import { colors } from 'react-native-elements';

module.exports = StyleSheet.create({
  /* #region   Child Container */
  childItemOuterContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
  },

  childItemInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  childItemImportanceIcon: {
    margin: 3,
  },

  childItemTextContainer: {
    width: '70%',
  },
  childItemText: {
    fontFamily: colorsProvider.font,
    fontSize: 18,
    marginLeft: 5,
  },
  childItemArrowIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 100,
  },
  childItemArrowIcon: {
    marginLeft: 10,
    marginRight: 10
  },

  /* #endregion */
  /* #region  Plus Button  */
  plusButtonContainer: {
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: colorsProvider.projectsComplimentaryColor,
    backgroundColor: colorsProvider.projectsComplimentaryColor,
    marginRight: 2,
    marginTop: 2,
  },

  plusButtonIcon: {},
  /* #endregion */
});
