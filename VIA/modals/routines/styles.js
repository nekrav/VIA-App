/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, Platform } from 'react-native';
import * as colorsProvider from '../../components/colorsProvider';

const fontFamily = Platform.OS == 'ios' ? colorsProvider.font : colorsProvider.font;

module.exports = StyleSheet.create({
  /* #region Outer Structure */
  outerView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colorsProvider.routinesMainColor,
    justifyContent: 'space-between'
  },
  outerViewDone: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colorsProvider.routinesMainColor,
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
    backgroundColor: colorsProvider.routinesMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.routinesMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
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
    backgroundColor: colorsProvider.routinesMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.routinesMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
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
    color: colorsProvider.routinesComplimentaryColor,
    marginLeft: 10,
    marginBottom: 5,
  },
  /* #endregion */

  /* #region Create Due Date Section */
  createDueDateContainer: {
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: colorsProvider.routinesMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.routinesMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
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
    color: colorsProvider.routinesPlaceholderColor,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  createSelectedDateText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: colorsProvider.routinesComplimentaryColor,
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
    transform: [{ rotate: '270deg' }],
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
    color: colorsProvider.routinesComplimentaryColor,
  },
  sliderTitle: {
    color: colorsProvider.routinesPlaceholderColor,
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
    backgroundColor: colorsProvider.routinesMainColor,
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: colorsProvider.routinesMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    alignItems: 'center'
  },
  hasProjectSelectionContainer: {
    borderRadius: 10,
    backgroundColor: colorsProvider.routinesMainColor,
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: colorsProvider.routinesMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
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
    color: colorsProvider.routinesPlaceholderColor,
    marginLeft: 10, 
    marginTop: 5,
    marginBottom: 5,
  },
  hasProjectSelectionButtonText: {
    fontSize: colorsProvider.fontSizeChildren,
    fontFamily: fontFamily,
    color: colorsProvider.routinesComplimentaryColor,
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
    backgroundColor: colorsProvider.routinesMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.routinesMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
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
    backgroundColor: colorsProvider.routinesMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.routinesMainColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
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
    color: colorsProvider.routinesPlaceholderColor,
    marginRight: 5,
    marginLeft: 8,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: fontFamily,
  },

  hasNotificationTimeButtonText: {
    fontSize: 16,
    color: colorsProvider.routinesComplimentaryColor,
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
    backgroundColor: colorsProvider.dirtyWhiteColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.dirtyWhiteColor,
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
    color: colorsProvider.routinesPlaceholderColor,
    marginTop: 5,
    marginLeft: 7,
    fontFamily: fontFamily,
  },
  hasNotesText: {
    color: colorsProvider.routinesMainColor,
    marginTop: 5,
    marginLeft: 7,
    fontFamily: fontFamily,
  },
  /* #endregion */

  /* #region Create Bottom Buttons Section */
  bottomButtonsContainer: {
    paddingTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bottomButtonLeftClose: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colorsProvider.routinesPlaceholderColor,
    backgroundColor: colorsProvider.routinesPlaceholderColor,
    shadowColor: colorsProvider.shadowColor,

  },
  bottomButtonLeftDisabled: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colorsProvider.routinesPlaceholderColor,
    backgroundColor: colorsProvider.routinesPlaceholderColor,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: colorsProvider.shadow
  },
  bottomButtonLeft: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colorsProvider.routinesComplimentaryColor,
    backgroundColor: colorsProvider.routinesComplimentaryColor,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: colorsProvider.shadow
  },
  bottomButtonRight: {
    marginLeft: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colorsProvider.routinesComplimentaryColor,
    backgroundColor: colorsProvider.routinesComplimentaryColor,
    marginRight: 50,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: colorsProvider.shadow
  },
  bottomButtonRightDisabled: {
    marginLeft: 50,
    marginRight: 50,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colorsProvider.routinesPlaceholderColor,
  },
  bottomButtonText: {
    fontSize: colorsProvider.fontButtonSize,
    textAlign: 'center',
    fontFamily: fontFamily,
    color: colorsProvider.homeTextColor,
  },
  bottomButtonTextDisabled: {
    fontSize: colorsProvider.fontButtonSize,
    textAlign: 'center',
    fontFamily: fontFamily,
    color: colorsProvider.routinesMainColor,
  },
  /* #endregion */


  /* #region  Complete Button Section */
  completeButtonBody: {
    margin: 10,
    borderColor: colorsProvider.routinesComplimentaryColor,
    // backgroundColor: colorsProvider.homeComplimentaryColor,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '12%',
  },
  completeButtonBodyDone: {
    margin: 10,
    borderColor: colorsProvider.habitsComplimentaryColor,
    backgroundColor: colorsProvider.finishedBackgroundColor,
    borderWidth: 2,
    borderColor: colorsProvider.habitsComplimentaryColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '12%',
  },
  completeButtonText: {
    fontFamily: fontFamily,
    color: colorsProvider.routinesComplimentaryColor,
    fontSize: colorsProvider.fontSizeChildren,
  },
  /* #endregion */

  /* #region  Children Items Section */
  childrenItemsContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 10,
    flex: 1,
    borderRadius: 10,
    backgroundColor: colorsProvider.routinesMainColor,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.routinesMainColor,
    marginRight: 10,
    marginLeft: 10,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  /* #region  Children Items Header */
  /* #region  Children Items Title */
  childrenItemsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  childrenItemsTitleTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  childrenItemsTitleText: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: fontFamily,
    color: colorsProvider.routinesComplimentaryColor,
    fontSize: colorsProvider.fontSizeMain,
  },
  /* #endregion */

  /* #region  Add Child Button */
  addTimeButtonContainer: {
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTimeButtonContainerView: {
    // flex: 2,
    width: '90%',
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: colorsProvider.routinesMainColor,
    backgroundColor: colorsProvider.routinesMainColor,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  addTimeButtonText: {
    fontSize: colorsProvider.fontSizeChildren,
    textAlign: 'center',
    fontFamily: fontFamily,
    marginLeft: 10,
    marginRight: 10,
  },
  /* #endregion */

  /* #endregion */

  /* #region  Children Container */
  childrenContainer: {
    flexGrow: 1,
    marginRight: 10,
    marginLeft: 10,
    alignContent: 'center',
    flexDirection: 'column',
    marginBottom: 5,
    marginTop: 2,
  },

  childContainer: {
    flex: 1,
    backgroundColor: colorsProvider.habitsMainColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    alignItems: 'center',
    borderRadius: 10,
    borderTopWidth: 2,
    borderTopColor: colorsProvider.habitsMainColor,
    flexDirection: 'row',
    marginTop: 2,
    shadowColor: colorsProvider.shadowColor,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  /* #endregion */

  /* #region  Child Item Section */
  childTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  childTitleText: {
    color: colorsProvider.habitsComplimentaryColor,
    fontSize: colorsProvider.fontSizeChildren,
    fontFamily: colorsProvider.font,
    marginLeft: 10,
  },
  childActionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childActionButtonText: {
    fontSize: 24,
    marginLeft: 10,
    marginRight: 10,
  },
  /* #endregion */
  /* #endregion */
});
