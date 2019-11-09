/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, PixelRatio } from 'react-native';

const buttonBackgroundColor = '#3a506b'
const titleFontSize = 24
const textColor = '#effcff'
const bodyFontSize = 20
const fontFamiy = 'Arial'
const backgroundColor = '#0b132b'

module.exports = StyleSheet.create({

    //#region Shared
    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: "5%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        color: "black",
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