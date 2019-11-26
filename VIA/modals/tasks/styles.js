/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, PixelRatio } from 'react-native';

const buttonBackgroundColor = '#3a506b'
const titleFontSize = 24
const textColor = '#effcff'
const bodyFontSize = 20
const fontFamily = "Futura"

const whiteColor = "#fff"
const blackColor = "#000"
const limeColor = "#52eb34"
const burgundyColor = "#db275a"
const yellowColor = '#ff1'
const redColor = "#ff0000"
const blueColor = '#2a27db'
const pinkColor = "#f0f"

module.exports = StyleSheet.create({

    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: yellowColor,
    },
    topNav: {
        flexDirection: "row",
        backgroundColor: pinkColor,
    },
    backButton: {
        backgroundColor: blueColor,
        marginLeft: "8%",
    },
    nameTextInput: {
        fontSize: 28,
        fontFamily: fontFamily,
        color: "black",
    },
    titleContainer: {
        backgroundColor: redColor,
        flexDirection: "row"
    },
    completeButtonContainer: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    completeButtonBody: {
        margin: 10,
        borderColor: whiteColor,
        backgroundColor: whiteColor,
        borderWidth: 5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    completeButtonText: {
        // margin: 10,
        fontFamily:"Futura",
        color: blackColor,
        fontSize: 30,
    },
    
    slidersContainer: {
        flexDirection: "row",
        backgroundColor:limeColor,
        justifyContent: 'center',
        alignContent: "center",
        flex: 1
    },
    verticalSliderContainer: {
        // marginLeft: "20%",
    },
    projectSelectionButton: {
        borderWidth: 5,
        borderColor: burgundyColor,
        backgroundColor: burgundyColor,
    },
    notesContainer: {
        backgroundColor: limeColor,
        height: "20%",
    },
    notesTextInput: {
        flex: 2,
        height: "20%",
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