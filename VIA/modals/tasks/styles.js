/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, PixelRatio } from 'react-native';

const buttonBackgroundColor = '#3a506b'
const titleFontSize = 24
const textColor = '#effcff'
const bodyFontSize = 20
const fontFamily = "Futura"
const backgroundColor = '#ff1'

module.exports = StyleSheet.create({

    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: backgroundColor,

    },
    topNav: {

        backgroundColor: "#f0f",
    },
    backButton: {
        marginLeft: "8%",
    },
    nameTextInput: {
        fontSize: 28,
        fontFamily: fontFamily,
        color: "black",
    },
    titleContainer: {
        backgroundColor: "#ff0000",
        flexDirection: "row"
    },
    completeButtonContainer: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    completeButtonBody: {
        // flex: 1,
        margin: 10,
        borderColor: "#fff",
        backgroundColor: "#fff",
        // padding: 20,
        borderWidth: 5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    completeButtonText: {
        margin: 10,
        color: "#000",
    },
    verticalSliderContainer: {
        // marginLeft: "20%",
    },
    sliders: {
        flexDirection: "row",
        flex: 1
    },
    numberOfItems: {

    },
    addButton: {

    },
    itemButton: {

    },
    listItem: {

    },
    checkBox: {

    },
    itemName: {

    },
})