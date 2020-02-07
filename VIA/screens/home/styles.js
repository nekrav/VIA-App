/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, PixelRatio, Dimensions, Platform } from 'react-native';

const buttonBackgroundColor = '#3a506b'
const titleFontSize = 24
const bodyFontSize = 20
const leftMargin = 5
const buttonFontSize = 20
const fontFamily = Platform.OS == "ios" ? "Roboto-Medium" : "Roboto-Medium"

const backgroundColor = "#ffffff"
const blueColor = "#00bbb1"
const textColor = "#2d3142"
const finishedBackgroundColor = "#4DFF87"
const grayColor = "#ededed"
const placeholderColor = "#ABABAB"
const homeColorButton = "#48A2F8"

const { width, height } = Dimensions.get('window');


module.exports = StyleSheet.create({

    titleContainer: {
        flexDirection: "row"
    },
    projectSectionContainer: {
    },
    dateContainer: {
        backgroundColor: blueColor,
    },
    completeButtonContainer: {
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },

    dueDateView: {
        marginLeft: 5,
        marginRight: 5,
        flexDirection: "row",
        justifyContent: 'space-between',
    },


    dateText: {
        fontSize: 18,
        fontFamily: fontFamily,
        color: placeholderColor,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },

    selectedDateText: {
        fontSize: 18,
        fontFamily: fontFamily,
        color: textColor,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    completeButtonText: {
        fontFamily: fontFamily,
        color: backgroundColor,
        fontSize: 30,
    },
    projectSectionView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: textColor,
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    projectSelectionButton: {
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
    },
    notificationTimesButton: {
        width: 120,
        height: 120,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 60,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },



    selectedProjectSelectionButtonText: {
        fontSize: 18,
        fontFamily: fontFamily,
        color: textColor,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    notesContainer: {
        borderTopColor: textColor,
        borderTopWidth: 2,
        height: "100%",
        flex: 1,
    },

    /* #region Outer Structure */
    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: backgroundColor,
    },
    outerViewDone: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: finishedBackgroundColor,
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
        backgroundColor: grayColor,
        borderTopWidth: 2,
        borderTopColor: grayColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    hasNameTextInputContainer: {
        borderRadius: 10,
        backgroundColor: blueColor,
        borderTopWidth: 2,
        borderTopColor: blueColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: "#000000",
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
        color: backgroundColor,
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
        backgroundColor: placeholderColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        alignItems: 'center',
        borderRadius: 20,
        borderTopWidth: 2,
        borderTopColor: placeholderColor,
        flexDirection: "row",
        width: '100%',
        marginTop: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    mainGoalContainer: {
        flex: 1,
        backgroundColor: blueColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        alignItems: 'center',
        borderRadius: 20,
        borderTopWidth: 2,
        borderTopColor: placeholderColor,
        flexDirection: "row",
        width: '100%',
        marginTop: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    mainGoalText: {
        color: backgroundColor,
        fontSize: 30,
        marginLeft: 10,
    },
    /* #endregion */

    /* #region Create Due Date Section */
    createDueDateContainer: {
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: blueColor,
        borderTopWidth: 2,
        borderTopColor: blueColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: "#000000",
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
        color: placeholderColor,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    createSelectedDateText: {
        fontSize: 18,
        fontFamily: fontFamily,
        color: backgroundColor,
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
        color: textColor,
    },
    sliderTitle: {
        color: placeholderColor,
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
        backgroundColor: grayColor,
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderTopColor: grayColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    hasProjectSelectionContainer: {
        borderRadius: 10,
        backgroundColor: blueColor,
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderTopColor: blueColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        shadowColor: "#000000",
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
        color: placeholderColor,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    hasProjectSelectionButtonText: {
        fontSize: 18,
        fontFamily: fontFamily,
        color: backgroundColor,
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
        backgroundColor: grayColor,
        borderTopWidth: 2,
        borderTopColor: grayColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        justifyContent: 'space-between',
        shadowColor: "#000000",
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
        backgroundColor: blueColor,
        borderTopWidth: 2,
        borderTopColor: blueColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        justifyContent: 'space-between',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }

    },
    notificationTimeButtonText: {
        fontSize: 16,
        color: placeholderColor,
        marginRight: 5,
        marginLeft: 8,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: fontFamily
    },

    hasNotificationTimeButtonText: {
        fontSize: 16,
        color: backgroundColor,
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
        backgroundColor: grayColor,
        borderTopWidth: 2,
        borderTopColor: grayColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        justifyContent: 'space-between',
        shadowColor: "#000000",
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
        backgroundColor: blueColor,
        borderTopWidth: 2,
        borderTopColor: blueColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        justifyContent: 'space-between',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        height: "100%",
    },
    createNotesText: {
        color: placeholderColor,
        marginTop: 5,
        marginLeft: 7,
        fontFamily: fontFamily
    },
    hasNotesText: {
        color: backgroundColor,
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
        shadowColor: "#000000",
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
        borderColor: blueColor,
        backgroundColor: blueColor,
        shadowColor: "#000000",
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
        borderColor: placeholderColor,
        backgroundColor: backgroundColor,
        marginRight: 50,
        shadowColor: "#000000",
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
        color: textColor,
    },
    bottomButtonTextDisabled: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: fontFamily,
        color: backgroundColor,
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
        borderColor: blueColor,
        backgroundColor: blueColor,
        borderWidth: 5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000000",
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
        backgroundColor: grayColor,
        borderTopWidth: 2,
        borderTopColor: grayColor,
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
        color: blueColor,
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
        borderWidth: 1,
        borderColor: placeholderColor,
        backgroundColor: backgroundColor,
        shadowColor: "#000000",
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
        fontSize: 14,
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
        alignContent: "center",
        flexDirection: "column",
        marginBottom: 5,
        marginTop: 2,
    },

    childContainer: {
        flex: 1,
        backgroundColor: blueColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        alignItems: 'center',
        borderRadius: 10,
        borderTopWidth: 2,
        borderTopColor: placeholderColor,
        flexDirection: "row",

        marginTop: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    /* #endregion */
    /* #region  Child Item Section */
    childTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    childTitleText: {
        color: backgroundColor,
        fontSize: 30,
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

    checkbox: {
        backgroundColor: blueColor,
    },
})