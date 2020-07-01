/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, Platform } from 'react-native';
import * as colorsProvider from '../../components/colorsProvider';
import { colors } from 'react-native-elements';

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

module.exports = StyleSheet.create({
    /* #region Outer Structure */
    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorsProvider.whiteColor,
    },
    outerViewDone: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colorsProvider.projectsMainColor,
    },
    /* #endregion */

    /* #region  Top Navigation */
    topNav: {
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    trashButton: {
        marginRight: "8%",
        justifyContent: "center",
    },
    topNavBackButton: {
        marginLeft: "8%",
    },
    /* #endregion */

    /* #region  Create Name Section */
    createNameContainer: {
        borderRadius: 10,
        backgroundColor: colorsProvider.projectsMainColor,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.projectsMainColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: colorsProvider.shadow
    },
    hasNameTextInputContainer: {
        borderRadius: 10,
        backgroundColor: colorsProvider.projectsMainColor,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.projectsMainColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: colorsProvider.shadow
    },
    createNameText: {
        fontSize: colorsProvider.fontSizeMain,
        fontFamily: fontFamily,
        color: colorsProvider.projectsComplimentaryColor,
        marginLeft: 10,
        marginBottom: 5,
    },
    createNameText: {
        fontSize: colorsProvider.fontSizeMain,
        fontFamily: fontFamily,
        color: colorsProvider.projectsComplimentaryColor,
        marginLeft: 10,
        marginBottom: 5,
    },
    /* #endregion */

    /* #region  Children Section */
    childrenItemsContainer: {
        flexDirection: 'column',
        // alignItems: 'center',
        alignContent: 'center',
        // justifyContent: 'center',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colorsProvider.projectsComplimentaryColor,
        backgroundColor: colorsProvider.projectsMainColor,
        marginRight: 10,
        marginLeft: 10,
        height: '30%',
    },
    /* #region  Children Items Header */
    /* #region  Children Items Title */
    childrenItemsTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
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
        color: colorsProvider.projectsComplimentaryColor,
        fontSize: colorsProvider.fontSizeChildren,
    },
    /* #endregion */

    /* #endregion */
    /* #region  Children Container */


    childContainer: {
        flex: 1,
        backgroundColor: colorsProvider.tasksMainColor,
        // justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colorsProvider.tasksComplimentaryColor,
        marginTop: 2,
        // width: '65%'
    },

    /* #endregion */
    /* #region  Child Item Section */
    childTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    childTitleText: {
        color: colorsProvider.tasksComplimentaryColor,
        fontSize: colorsProvider.fontSizeChildren,
        marginLeft: 10,
        fontFamily: colorsProvider.font,
        width: '80%',

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
 
    /* #region Create Due Date Section */
    createDueDateContainer: {
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: colorsProvider.projectsMainColor,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.projectsMainColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: colorsProvider.shadow

    },
    createDateText: {
        fontSize: colorsProvider.fontSizeChildren,
        fontFamily: fontFamily,
        color: colorsProvider.projectsPlaceholderColor,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    createSelectedDateText: {
        fontSize: colorsProvider.fontSizeChildren,
        fontFamily: fontFamily,
        color: colorsProvider.projectsComplimentaryColor,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    },
    /* #endregion */

    /* #region  Sliders Section */
    sliderSlider: {
        width: 250,
        height: 1,
        transform: [{ rotate: '270deg' }],
        marginBottom: 10,
    },
    slidersSection: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    slidersTitlesContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        margin: 10,
    },
    sliderTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: "8%",
        marginTop: "2%",
        marginBottom: 20,
    },
    sliderTitleContainerRight: {
        marginLeft: "10%",
        marginTop: "2%",
    },
    sliderTitleContainerCenter: {
        marginTop: "2%",
    },
    sliderTitleNull: {
        fontFamily: fontFamily,
        fontSize: colorsProvider.fontSizeMain,
        color: colorsProvider.projectsPlaceholderColor,
    },
    sliderTitle: {
        color: colorsProvider.projectsComplimentaryColor,
        fontFamily: fontFamily,
        fontSize: colorsProvider.fontSizeMain,
    },
    slidersContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        marginTop: "35%",
        marginBottom: "35%",
    },
    sliderContainerLeft: {
        // marginRight: -40,
    },
    sliderContainerRight: {
        marginLeft: -40,
    },
    sliderContainerCenter: {
        marginTop: "2%",
    },
    /* #endregion */

    /* #region  Create Project Selection Section */
    createProjectSelectionContainer: {
        borderRadius: 10,
        backgroundColor: colorsProvider.projectsMainColor,
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderTopColor: colorsProvider.projectsMainColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: colorsProvider.shadow
    },
    hasProjectSelectionContainer: {
        borderRadius: 10,
        backgroundColor: colorsProvider.projectsMainColor,
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderTopColor: colorsProvider.projectsMainColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: colorsProvider.shadow
    },
    createProjectSelectionButtonText: {
        fontSize: colorsProvider.fontSizeChildren,
        fontFamily: fontFamily,
        color: colorsProvider.projectsPlaceholderColor,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 15,
    },
    hasProjectSelectionButtonText: {
        fontSize: colorsProvider.fontSizeChildren,
        fontFamily: fontFamily,
        color: colorsProvider.projectsComplimentaryColor,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    /* #endregion */

    /* #region Create Notification Times Section  */
    notificationTimesButtonContainer: {
        flexDirection: "row",
        alignContent: "center",
        borderRadius: 10,
        backgroundColor: colorsProvider.projectsMainColor,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.projectsMainColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        justifyContent: 'space-between',
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: colorsProvider.shadow

    },

    hasNotificationTimesButtonContainer: {
        flexDirection: "row",
        alignContent: "center",
        borderRadius: 10,
        backgroundColor: colorsProvider.projectsMainColor,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.projectsMainColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        justifyContent: 'space-between',
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: colorsProvider.shadow

    },
    notificationTimeButtonText: {
        fontSize: colorsProvider.fontSizeChildren,
        color: colorsProvider.projectsPlaceholderColor,
        marginRight: 5,
        marginLeft: 8,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: fontFamily
    },

    hasNotificationTimeButtonText: {
        fontSize: colorsProvider.fontSizeChildren,
        color: colorsProvider.projectsComplimentaryColor,
        marginRight: 5,
        marginLeft: 8,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: fontFamily
    },
    /* #endregion */

    /* #region  Create Notes Section */
    createNotesContainer: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        borderRadius: 10,
        backgroundColor: colorsProvider.projectsMainColor,
        borderWidth: 1,
        borderColor: colorsProvider.projectsComplimentaryColor,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        justifyContent: 'space-between',
    },
    hasNotesContainer: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        borderRadius: 10,
        backgroundColor: colorsProvider.projectsMainColor,
        borderWidth: 1,
        borderColor: colorsProvider.projectsComplimentaryColor,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        justifyContent: 'space-between',
    },
    createNotesText: {
        color: colorsProvider.projectsPlaceholderColor,
        marginTop: 5,
        marginLeft: 7,
        fontFamily: fontFamily
    },
    hasNotesText: {
        color: colorsProvider.projectsComplimentaryColor,
        marginTop: 5,
        marginLeft: 7,
        fontFamily: fontFamily
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
        borderColor: colorsProvider.projectsPlaceholderColor,
        backgroundColor: colorsProvider.projectsPlaceholderColor,
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
        borderColor: colorsProvider.projectsPlaceholderColor,
        backgroundColor: colorsProvider.projectsPlaceholderColor,
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
        borderColor: colorsProvider.projectsComplimentaryColor,
        backgroundColor: colorsProvider.projectsComplimentaryColor,
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
        borderColor: colorsProvider.projectsComplimentaryColor,
        backgroundColor: colorsProvider.projectsComplimentaryColor,
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
        borderColor: colorsProvider.projectsPlaceholderColor,
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
        color: colorsProvider.projectsMainColor,
    },
    /* #endregion */

    /* #region  Complete Button Section */
    completeButtonBody: {
        margin: 10,
        borderColor: colorsProvider.projectsComplimentaryColor,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // height: '12%',
      },
      completeButtonBodyDone: {
        margin: 10,
        borderColor: colorsProvider.tasksComplimentaryColor,
        backgroundColor: colorsProvider.finishedBackgroundColor,
        borderWidth: 2,
        borderColor: colorsProvider.tasksComplimentaryColor,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // height: '12%',
      },
      completeButtonText: {
        fontFamily: fontFamily,
        color: colorsProvider.projectsComplimentaryColor,
        fontSize: colorsProvider.fontSizeChildren,
      },
      /* #endregion */
    
})