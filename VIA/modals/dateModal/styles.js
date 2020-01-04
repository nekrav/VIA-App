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

    /* #region  Close Button */
    closeButton: {
        // flex: 1,
        // marginLeft: 50,
        marginTop: 20,
        marginLeft: "32%",
        marginRight: "32%",
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: blueColor,
        backgroundColor: blueColor,
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    closeButtonText: {
        justifyContent: "center",
        color: textColor,
        fontSize: buttonFontSize,
        fontFamily: fontFamily
    },
    
    /* #endregion */

})