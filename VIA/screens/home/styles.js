/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, Platform } from 'react-native';
import * as colorsProvider from '../../components/colorsProvider';

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

module.exports = StyleSheet.create({

    /* #region Outer Structure */
    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorsProvider.homeComplimentaryColor,
    },
    /* #endregion */

    /* #region  Top Navigation */
    topNav: {
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: 'flex-end',
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
        backgroundColor:  colorsProvider.whiteColor,
        borderTopWidth: 2,
        borderTopColor:  colorsProvider.whiteColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    hasNameTextInputContainer: {
        borderRadius: 10,
        backgroundColor: colorsProvider.homeComplimentaryColor,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.homeComplimentaryColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    createNameText: {
        fontSize: 30,
        fontFamily: fontFamily,
        color: colorsProvider.homeMainColor,
        marginLeft: 10,
        marginBottom: 5,
    },
    /* #endregion */

    /* #region  3 Main Goals Section */
    mainGoalsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },

    mainGoalNotSelected: {
        flex: 1,
        backgroundColor: colorsProvider.homePlaceholderColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        alignItems: 'center',
        borderRadius: 20,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.homePlaceholderColor,
        flexDirection: "row",
        width: '100%',
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    mainGoalContainer: {
        flex: 1,
        backgroundColor: colorsProvider.homeComplimentaryColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        alignItems: 'center',
        borderRadius: 20,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.homePlaceholderColor,
        flexDirection: "row",
        width: '100%',
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    mainGoalText: {
        color: colorsProvider.homeMainColor,
        fontSize: 30,
        marginLeft: 10,
    },
    /* #endregion */

    /* #region Create Due Date Section */
    createDueDateContainer: {
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: colorsProvider.homeComplimentaryColor,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.homeComplimentaryColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }

    },
    createDateText: {
        fontSize: 18,
        fontFamily: fontFamily,
        color: colorsProvider.whitePlaceholderColor,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    createSelectedDateText: {
        fontSize: 18,
        fontFamily: fontFamily,
        color: colorsProvider.homeMainColor,
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
        transform: [{ rotate: '270deg' }]
    },
    slidersSection: {
        flexDirection: "column",
        justifyContent: 'center',
    },
    slidersTitlesContainer: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    sliderTitleContainerLeft: {
        marginRight: "8%",
        marginTop: "2%",
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
        fontSize: 24,
        color: colorsProvider.homeTextColor,
    },
    sliderTitle: {
        color: colorsProvider.homePlaceholderColor,
        fontFamily: fontFamily,
        fontSize: 24,
    },
    slidersContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: "35%",
        marginBottom: "35%",
    },
    sliderContainerLeft: {
        marginRight: -40,
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
        backgroundColor:  colorsProvider.whiteColor,
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderTopColor:  colorsProvider.whiteColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    hasProjectSelectionContainer: {
        borderRadius: 10,
        backgroundColor: colorsProvider.homeComplimentaryColor,
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderTopColor: colorsProvider.homeComplimentaryColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    createProjectSelectionButtonText: {
        fontSize: 18,
        fontFamily: fontFamily,
        color: colorsProvider.homePlaceholderColor,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    hasProjectSelectionButtonText: {
        fontSize: 18,
        fontFamily: fontFamily,
        color: colorsProvider.homeMainColor,
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
        backgroundColor:  colorsProvider.whiteColor,
        borderTopWidth: 2,
        borderTopColor:  colorsProvider.whiteColor,
        flexDirection: "row",
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
            width: 0
        }

    },

    hasNotificationTimesButtonContainer: {
        flexDirection: "row",
        alignContent: "center",
        borderRadius: 10,
        backgroundColor: colorsProvider.homeComplimentaryColor,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.homeComplimentaryColor,
        flexDirection: "row",
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
            width: 0
        }

    },
    notificationTimeButtonText: {
        fontSize: 16,
        color: colorsProvider.homePlaceholderColor,
        marginRight: 5,
        marginLeft: 8,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: fontFamily
    },

    hasNotificationTimeButtonText: {
        fontSize: 16,
        color: colorsProvider.homeMainColor,
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
        backgroundColor:  colorsProvider.whiteColor,
        borderTopWidth: 2,
        borderTopColor:  colorsProvider.whiteColor,
        flexDirection: "row",
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
            width: 0
        },
        height: "100%",
    },
    hasNotesContainer: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        borderRadius: 10,
        backgroundColor: colorsProvider.whiteColor,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.whiteColor,
        flexDirection: "row",
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
            width: 0
        },
        height: "100%",
    },
    createNotesText: {
        color: colorsProvider.whitePlaceholderColor,
        marginTop: 5,
        marginLeft: 7,
        fontFamily: fontFamily,
        fontSize: colorsProvider.fontSizeChildren
    },
    hasNotesText: {
        color: colorsProvider.homeComplimentaryColor,
        marginTop: 5,
        marginLeft: 7,
        fontFamily: fontFamily,
        fontSize: colorsProvider.fontSizeChildren
    },
    /* #endregion */

    /* #region Create Bottom Buttons Section */
    bottomButtonsContainer: {
        paddingTop: 18,
        flexDirection: "row",
        justifyContent: "space-between",
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
        borderColor: colorsProvider.homePlaceholderColor,
        backgroundColor: colorsProvider.homePlaceholderColor,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    bottomButtonLeft: {
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
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    bottomButtonRight: {
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
            width: 0
        }
    },
    bottomButtonText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: fontFamily,
        color: colorsProvider.homeTextColor,
    },
    bottomButtonTextDisabled: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: fontFamily,
        color: colorsProvider.homeMainColor,
    },
    /* #endregion */

    notesTitle: {
        fontSize: 18,
    },
    notesTextInput: {
        fontSize: 18,
    },
    completeButtonBody: {
        margin: 10,
        flex: 1,
        borderColor: colorsProvider.homeComplimentaryColor,
        backgroundColor: colorsProvider.homeComplimentaryColor,
        borderWidth: 5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
    },
    completeAndNotifSection: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    projectsNotificationsSection: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "center",
    },
    notificationTimesText: {
        fontFamily: fontFamily,
        fontSize: 14,
        alignItems: 'center',
        justifyContent: "center",
        margin: 2,
    },
    /* #region  Children Section */
    childrenItemsContainer: {
        flexDirection: 'column',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        borderRadius: 10,
        backgroundColor:  colorsProvider.whiteColor,
        borderTopWidth: 2,
        borderTopColor:  colorsProvider.whiteColor,
        marginRight: 10,
        marginLeft: 10,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
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
        color: colorsProvider.homeComplimentaryColor,
        fontSize: 25,
    },
    /* #endregion */

    /* #region  Add Child Button */
    addTimeButtonContainer: {
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addTimeButtonContainerView: {
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: colorsProvider.homePlaceholderColor,
        backgroundColor: colorsProvider.homeComplimentaryColor,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addTimeButtonText: {
        fontSize: colorsProvider.fontButtonSize,
        textAlign: 'center',
        fontFamily: fontFamily,
        marginLeft: 10,
        marginRight: 10,
        color: colorsProvider.whiteColor
    },
    /* #endregion */

    /* #endregion */
    /* #region  Children Container */
    childrenContainer: {
        flexGrow: 1,
        marginRight: 10,
        marginLeft: 10,
        alignContent: "center",
        flexDirection: "column",
        marginBottom: 5,
        marginTop: 2,
    },

    childContainer: {
        flex: 1,
        backgroundColor: colorsProvider.homeComplimentaryColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderTopColor: colorsProvider.homePlaceholderColor,
        flexDirection: "row",
        marginTop: 2,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        padding: 5,
    },

    /* #endregion */
    /* #region  Child Item Section */
    childTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    childTitleText: {
        color: colorsProvider.homeMainColor,
        fontSize: colorsProvider.fontSizeChildren,
        marginLeft: 5,
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
})