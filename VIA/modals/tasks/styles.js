/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, PixelRatio } from 'react-native';

const buttonBackgroundColor = '#3a506b'
const titleFontSize = 24
const textColor = '#effcff'
const bodyFontSize = 20
const fontFamiy = 'Montserrat'
const backgroundColor = '#ff1'

module.exports = StyleSheet.create({

    //#region Shared
    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: backgroundColor,
        // padding: "3%",
        // margin: "3%",
        // marginTop: "10%",
        // marginBottom: "10%",
        // marginLeft: "5%",
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    topNav: {
        // flex: 1,
        flexDirection: 'column',
        backgroundColor: "#f0f",
        // marginTop: "2%",
        // marginTop: "1%",
        // marginLeft: "3%",
        // marginBottom: "10%"
    },
    backButton: {
        marginTop:"12%",
        marginBottom:"5%",
        marginLeft: "5%",
    },
    textInput: {
        fontFamily: fontFamiy,
        color: "black",
    },
    nameContainer: {
        backgroundColor: "#ff0000",
    },
    title: {
        marginTop: 22,
        alignItems: "center"
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