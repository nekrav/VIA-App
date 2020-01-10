/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, PixelRatio, Platform} from 'react-native';
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



module.exports = StyleSheet.create({

    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        marginTop: 22,
        alignItems: "center"
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
})