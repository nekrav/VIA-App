/* eslint-disable no-unused-vars*/
import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
/* eslint-enable no-unused-vars*/
import { StyleSheet, Platform } from 'react-native';

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font


module.exports = StyleSheet.create({

    /* #region Outer Structure */
    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        justifyContent: 'center',
        alignContent: 'center',
    },
    outerViewDone: {
        flex: 2,
        flexDirection: 'column',
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
        backgroundColor: colorsProvider.whiteColor,
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
    },
    /* #endregion */

    /* #region  Weekday Notifications container */
    weekdayNotificationContainer: {
        backgroundColor: colorsProvider.whiteColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 20,
        flex: 1,
        borderWidth: 1,
        borderColor: colorsProvider.homePlaceholderColor,
        backgroundColor: colorsProvider.whiteColor,
        shadowColor: colorsProvider.shadowColor,
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
        alignItems: 'center',
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
        borderColor: colorsProvider.homePlaceholderColor,
        backgroundColor: colorsProvider.whiteColor,
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
        fontSize: 14,
        textAlign: 'center',
        fontFamily: fontFamily,
        marginLeft: 10,
        marginRight: 10,
    },
    /* #endregion */

    /* #region  Weekday notification checkbox */
    weekSelectionTextContainer: {width: 100,  
        justifyContent:'space-between', 
        marginRight: '20%'
    },
    weekSelectionContainer: {
        borderWidth: 0,
        backgroundColor: colorsProvider.whiteColor,
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
        // borderWidth: 1,
        // borderColor: blueColor,
        // backgroundColor: blueColor,
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
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
        marginTop: 5,
    },
    weekdayNotificationTimeText: {
        fontFamily: fontFamily,
        fontSize: 16,
        color: colorsProvider.whiteColor,
    }

    /* #endregion */
})