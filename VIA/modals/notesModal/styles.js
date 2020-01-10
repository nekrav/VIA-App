/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, PixelRatio, Dimensions, Platform } from 'react-native';

const buttonBackgroundColor = '#3a506b'
const titleFontSize = 24
const bodyFontSize = 20
const buttonFontSize = 20
const leftMargin = 5
const fontFamily = Platform.OS == "ios" ? "Roboto-Medium" : "Roboto-Medium"

const backgroundColor = "#ffffff"
const blueColor = "#068ae8"
const textColor = "#2d3142"
const finishedBackgroundColor = "#a8ffe0"
const grayColor = "#ededed"
const placeholderColor = "#ABABAB"
const homeColorButton = "#48A2F8"

const { width, height } = Dimensions.get('window');


module.exports = StyleSheet.create({

    /* #region Outer Structure */
    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignContent: 'center',
    },
    outerViewDone: {
        flex: 2,
        flexDirection: 'column',
        backgroundColor: finishedBackgroundColor,
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

    notesContainer: {
        flex: 1,
        alignItems: 'flex-start',
        
    },
    notesTextInput: {
        fontSize: 18,
        fontFamily: fontFamily,
        color: "#000",
        marginRight: 5,
        width: "100%"
    },

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
    },
    /* #endregion */

    /* #region  Weekday Notifications container */
    weekdayNotificationContainer: {
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 20,
        flex: 1,
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
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },


    weekdayNotificationButtonsContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    /* #endregion */

    /* #region  Add Notification Time Button */
    addTimeButtonContainer: {
        flex: 1,
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

    /* #region  Weekday notification checkbox */

    weekSelectionContainer: {
        borderWidth: 0,
        width: '40%',
        backgroundColor: backgroundColor,
        marginRight: 70,
    },

    checkboxText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: fontFamily,

    },
    /* #endregion */

    /* #region  Weekday Notification Time Bubble */
    weekdayNotificationTimeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    weekdayNotificationTimeContainerView: {
        marginLeft: 8,
        borderRadius: 20,
        paddingTop: 3,
        paddingBottom: 3,
        flex: 1,
        borderWidth: 1,
        borderColor: blueColor,
        backgroundColor: blueColor,
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
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
        marginTop: 5,
    },
    weekdayNotificationTimeText: {
        fontFamily: fontFamily,
        fontSize: 16,
        color: backgroundColor,
    }

    /* #endregion */
})