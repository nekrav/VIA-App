/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import {StyleSheet, Dimensions, Platform} from 'react-native';
import * as colorsProvider from '../../components/colorsProvider';

const fontSize = 18;
const fontFamily = Platform.OS == 'ios' ? colorsProvider.font : colorsProvider.font;


module.exports = StyleSheet.create({
  /* #region Outer Structure */
  outerView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colorsProvider.habitsMainColor,
    justifyContent: 'space-between'
  },
  outerViewDone: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  /* #endregion */

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

  /* #region  Create Name Section */
  createNameContainer: {
    borderRadius: 10,
    backgroundColor: colorsProvider.habitsMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.habitsMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  hasNameTextInputContainer: {
    borderRadius: 10,
    backgroundColor: colorsProvider.habitsMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.habitsMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  createNameText: {
    fontSize: 30,
    fontFamily: fontFamily,
    color: colorsProvider.habitsComplimentaryColor,
    marginLeft: 10,
    marginBottom: 5,
  },
  hasNameText: {
    fontSize: 30,
    fontFamily: fontFamily,
    color: colorsProvider.habitsComplimentaryColor,
    marginLeft: 10,
    marginBottom: 5,
  },
  /* #endregion */

  /* #region Create Due Date Section */
  createDueDateContainer: {
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: colorsProvider.habitsMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.habitsMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  createDateText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: colorsProvider.habitsPlaceholderColor,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  hasDateText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: colorsProvider.habitsComplimentaryColor,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  createSelectedDateText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: colorsProvider.habitsComplimentaryColor,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
  },
  hasSelectedDateText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: colorsProvider.habitsComplimentaryColor,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
  },
  /* #endregion */

  /* #region  Sliders Section */

  sliderSlider: {
    width: 250,
    height: 1,
    transform: [{rotate: '270deg'}],
  },
  slidersSection: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  slidersTitlesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sliderTitleContainerLeft: {
    marginRight: '8%',
    marginTop: '2%',
  },
  sliderTitleContainerRight: {
    marginLeft: '10%',
    marginTop: '2%',
  },
  sliderTitleContainerCenter: {
    marginTop: '2%',
  },
  sliderTitleNull: {
    fontFamily: fontFamily,
    fontSize: 24,
    color: colorsProvider.habitsComplimentaryColor,
  },
  sliderTitle: {
    color: colorsProvider.habitsPlaceholderColor,
    fontFamily: fontFamily,
    fontSize: 24,
  },
  slidersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '35%',
    marginBottom: '35%',
  },
  sliderContainerLeft: {
    marginRight: -40,
  },
  sliderContainerRight: {
    marginLeft: -40,
  },
  sliderContainerCenter: {
    marginTop: '2%',
  },
  /* #endregion */

  /* #region  Create Project Selection Section */
  createProjectSelectionContainer: {
    borderRadius: 10,
    backgroundColor: colorsProvider.habitsMainColor,
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: colorsProvider.habitsMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  hasProjectSelectionContainer: {
    borderRadius: 10,
    backgroundColor: colorsProvider.habitsMainColor,
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: colorsProvider.habitsMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  createProjectSelectionButtonText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: colorsProvider.habitsPlaceholderColor,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  hasProjectSelectionButtonText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: colorsProvider.habitsComplimentaryColor,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  /* #endregion */

  /* #region Create Notification Times Section  */
  notificationTimesButtonContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: colorsProvider.habitsMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.habitsMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    justifyContent: 'space-between',
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  hasNotificationTimesButtonContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: colorsProvider.habitsMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.habitsMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    justifyContent: 'space-between',
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  notificationTimeButtonText: {
    fontSize: 16,
    color: colorsProvider.habitsPlaceholderColor,
    marginRight: 5,
    marginLeft: 8,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: fontFamily,
  },

  hasNotificationTimeButtonText: {
    fontSize: 16,
    color: colorsProvider.habitsComplimentaryColor,
    marginRight: 5,
    marginLeft: 8,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: fontFamily,
  },
  /* #endregion */

  /* #region  Create Notes Section */
  createNotesContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: colorsProvider.habitsMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.habitsMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    justifyContent: 'space-between',
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    height: '100%',
  },
  hasNotesContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: colorsProvider.homeComplimentaryColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.homeComplimentaryColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    justifyContent: 'space-between',
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    height: '100%',
  },
  createNotesText: {
    color: colorsProvider.habitsPlaceholderColor,
    marginTop: 5,
    marginLeft: 7,
    fontFamily: fontFamily,
  },
  hasNotesText: {
    color: colorsProvider.habitsMainColor,
    marginTop: 5,
    marginLeft: 7,
    fontFamily: fontFamily,
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
    borderColor: colorsProvider.habitsPlaceholderColor,
    backgroundColor: colorsProvider.habitsPlaceholderColor,
    shadowColor: colorsProvider.shadowColor,
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
    borderWidth: 2,
    borderColor: colorsProvider.habitsComplimentaryColor,
    backgroundColor: colorsProvider.habitsComplimentaryColor,
    shadowColor: colorsProvider.shadowColor,
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
    borderColor: colorsProvider.habitsPlaceholderColor,
    backgroundColor: colorsProvider.habitsMainColor,
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
    color: colorsProvider.habitsComplimentaryColor,
  },
  bottomButtonTextDisabled: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fontFamily,
    color: colorsProvider.habitsMainColor,
  },
  /* #endregion */

  /* #region  Complete Button Section */
  completeButtonBody: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '12%',
  },
  completeButtonBodyDone: {
    margin: 10,
    borderColor: colorsProvider.habitsComplimentaryColor,
    backgroundColor: colorsProvider.habitsMainColor,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '12%',
  },
  completeButtonText: {
    fontFamily: fontFamily,
    fontSize: fontSize
  },
  /* #endregion */

});
