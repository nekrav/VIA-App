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
        flexDirection: "row",
        backgroundColor: "#f0f",
    },
    backButton: {
        backgroundColor: '#2a27db',
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
        margin: 10,
        borderColor: "#fff",
        backgroundColor: "#fff",
        borderWidth: 5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    completeButtonText: {
        // margin: 10,
        fontFamily:"Futura",
        color: "#000",
        fontSize: 30,
    },
    
    slidersContainer: {
        flexDirection: "row",
        backgroundColor:"#52eb34",
        justifyContent: 'center',
        alignContent: "center",
        flex: 1
    },
    verticalSliderContainer: {
        // marginLeft: "20%",
    },
    projectSelectionButton: {
        borderWidth: 5,
        borderColor: "#db275a",
        backgroundColor: "#db275a",
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