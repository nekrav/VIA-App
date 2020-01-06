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
        // opacity:1,
        flexDirection: 'column',
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        justifyContent: 'center',
        alignContent: 'center'
        // alignItems: "center",

    },
    outerViewDone: {
        flex: 2,
        flexDirection: 'column',
        backgroundColor: finishedBackgroundColor,
    },
    /* #endregion */

    datePickerView: {
        // flex: 2,
        // alignItems: 'center'

    },

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

    /* #region  Bottom Buttons */
    bottomButtonsContainer: {
        paddingTop: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

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
    bottomButtonCenter: {
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
    },
    /* #endregion */

    weekdayNotificationContainer: {
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    weekdayNotificationButtonsContainer: {
        backgroundColor: backgroundColor,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    /* #region  Add Notification Time Button */
    addTimeButtonContainer: {
        flex: 1,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addTimeButtonContainerView: {
        marginLeft: 10,
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    addTimeButtonText: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: fontFamily,
    },
    /* #endregion */



    /* #region  Weekday notification checkbox */
    weekSelectionContainer: {
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

    checkboxText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: fontFamily,
    },
    /* #endregion */

    weekdayNotificationTimesContainer: {
       marginTop: 10,
       marginBottom: 10,
    },
    weekdayNotificationTimeContainer: {
        flex: 1,
        // marginRight: ,
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
    },
    weekdayNotificationTimeText: {
        fontFamily: fontFamily,
        fontSize: 16,
        color: backgroundColor,
    }

})