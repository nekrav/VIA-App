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

const backgroundColor = "#E5C797"
const complimentaryColor = "#73521C";
const blueColor = "#00bbb1"
const textColor = "#2d3142"
const finishedBackgroundColor = "#4DFF87"
const placeholderColor = "#ABABAB"
const shadowColor = "#000000"

const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({

     /* #region Outer Structure */
     outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: backgroundColor,
    },
    /* #endregion */

    /* #region  Top Navigation */
    topNav: {
        marginBottom: 5,
        backgroundColor: backgroundColor,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: "10%",
        marginRight: "10%",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 10,
        borderTopWidth: 2,
        borderTopColor: backgroundColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        paddingRight: 10,
        paddingLeft: 10,
        shadowColor: shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }

    },
    addItemButtonContainer: {
        justifyContent: "center",
    },
    addItemButtonText: {
        justifyContent: "center",
        fontSize: 50,
        color: complimentaryColor
    },
    topNavLeftTitleText: {
        fontSize: 30,
        fontFamily: fontFamily,
        color: complimentaryColor,
    },
    topNavCenterTitleText: {
        fontSize: 30,
        fontFamily: fontFamily,
        marginLeft: "-16%",
        color: complimentaryColor,
    },
    /* #endregion */

    listItemContainer: {
        backgroundColor: backgroundColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        borderRadius: 10,
        borderTopWidth: 2,
        borderTopColor: placeholderColor,
        flexDirection: "row",
        marginTop: 2,
        shadowColor: shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }

    },

    listItemContainerFinished:{
        backgroundColor: backgroundColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        borderRadius: 10,
        borderTopWidth: 2,
        borderTopColor: placeholderColor,
        flexDirection: "row",
        marginTop: 2,
        shadowColor: shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    listItemTextContainer: {
        width: 130,
        maxWidth: 130,
        marginRight: 10,
    },
    listItemText: {
        color: complimentaryColor,
        fontFamily: fontFamily,
        fontSize: 18,
    },
    listItemIcon: {

    },
    checkboxAndNameContainer: {
        flexDirection: 'row',
        alignItems: "center",

    },
    checkbox: {
        backgroundColor: blueColor,
    },
    listItemActionButtonsContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-evenly',
        // marginLeft: 100,

    },
    listItemActionButton: {
        marginLeft: "3%",
        marginLeft: "3%",
        flexDirection: 'row',
        alignItems: "center",
        // marginLeft: 10,

    }
})