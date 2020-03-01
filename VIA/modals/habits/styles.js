/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import {StyleSheet, Dimensions, Platform} from 'react-native';

const fontSize = 18;
const fontFamily = Platform.OS == 'ios' ? 'Roboto-Medium' : 'Roboto-Medium';

const backgroundColor = '#D6A2AD';
const complimentaryColor = "#711E30";
const blueColor = '#00bbb1';
const textColor = '#711E30';
const finishColor = '#16E500'
const finishColorBorderColor = '#10AE00'
const grayColor = '#ededed';
const placeholderColor = "#A77E8C";

const {width, height} = Dimensions.get('window');

module.exports = StyleSheet.create({
  /* #region Outer Structure */
  outerView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    justifyContent: 'space-between'
  },
  outerViewDone: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: finishColor,
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
    backgroundColor: backgroundColor,
    borderTopWidth: 2,
    borderTopColor: backgroundColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  hasNameTextInputContainer: {
    borderRadius: 10,
    backgroundColor: backgroundColor,
    borderTopWidth: 2,
    borderTopColor: backgroundColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    shadowColor: '#000000',
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
    color: complimentaryColor,
    marginLeft: 10,
    marginBottom: 5,
  },
  hasNameText: {
    fontSize: 30,
    fontFamily: fontFamily,
    color: complimentaryColor,
    marginLeft: 10,
    marginBottom: 5,
  },
  /* #endregion */

  /* #region Create Due Date Section */
  createDueDateContainer: {
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: backgroundColor,
    borderTopWidth: 2,
    borderTopColor: backgroundColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    shadowColor: '#000000',
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
    color: placeholderColor,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  hasDateText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: complimentaryColor,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  createSelectedDateText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: complimentaryColor,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
  },
  hasSelectedDateText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: complimentaryColor,
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
    color: textColor,
  },
  sliderTitle: {
    color: placeholderColor,
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
    backgroundColor: backgroundColor,
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: backgroundColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  hasProjectSelectionContainer: {
    borderRadius: 10,
    backgroundColor: backgroundColor,
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: backgroundColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    shadowColor: '#000000',
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
    color: placeholderColor,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  hasProjectSelectionButtonText: {
    fontSize: 18,
    fontFamily: fontFamily,
    color: complimentaryColor,
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
    backgroundColor: backgroundColor,
    borderTopWidth: 2,
    borderTopColor: backgroundColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    justifyContent: 'space-between',
    shadowColor: '#000000',
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
    backgroundColor: backgroundColor,
    borderTopWidth: 2,
    borderTopColor: backgroundColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  notificationTimeButtonText: {
    fontSize: 16,
    color: placeholderColor,
    marginRight: 5,
    marginLeft: 8,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: fontFamily,
  },

  hasNotificationTimeButtonText: {
    fontSize: 16,
    color: complimentaryColor,
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
    backgroundColor: grayColor,
    borderTopWidth: 2,
    borderTopColor: grayColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    justifyContent: 'space-between',
    shadowColor: '#000000',
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
    backgroundColor: blueColor,
    borderTopWidth: 2,
    borderTopColor: blueColor,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 2,
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    height: '100%',
  },
  createNotesText: {
    color: placeholderColor,
    marginTop: 5,
    marginLeft: 7,
    fontFamily: fontFamily,
  },
  hasNotesText: {
    color: backgroundColor,
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
    borderColor: placeholderColor,
    backgroundColor: placeholderColor,
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
    borderWidth: 2,
    borderColor: complimentaryColor,
    backgroundColor: complimentaryColor,
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
    color: textColor,
  },
  bottomButtonTextDisabled: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fontFamily,
    color: backgroundColor,
  },
  /* #endregion */

  /* #region  Complete Button Section */
  completeButtonBody: {
    margin: 10,
    borderColor: finishColor,
    backgroundColor: finishColor,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '12%',
    borderColor: finishColorBorderColor,
  },
  completeButtonBodyDone: {
    margin: 10,
    borderColor: complimentaryColor,
    backgroundColor: backgroundColor,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '12%',
    borderColor: finishColorBorderColor,
  },
  completeButtonText: {
    fontFamily: fontFamily,
    fontSize: fontSize
  },
  /* #endregion */

});
