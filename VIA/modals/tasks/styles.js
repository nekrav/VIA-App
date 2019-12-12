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
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: 'space-between',
        backgroundColor: pinkColor,
    },
    trashButton: {
        backgroundColor: blueColor,
        marginRight: "8%",
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
        backgroundColor: blueColor,
        flexDirection: "row"
    },
    dateContainer: {
        backgroundColor: whiteColor,
    },
    completeButtonContainer: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
   
    dueDateView: {
        marginLeft: 5,
        marginRight: 5,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    dateText: {
        fontFamily: fontFamily,
        fontSize: 18,
    },
    completeButtonText: {
        // margin: 10,
        fontFamily: fontFamily,
        color: blackColor,
        fontSize: 30,
    },
    sliderTitleContainer: {
        backgroundColor: "#f0f",
        alignItems: "center",
        marginBottom: 5,
    },
    sliderTitle: {
        fontFamily: fontFamily,
        fontSize: 20,

    },
    slidersContainer: {
        flexDirection: "row",
        backgroundColor: limeColor,
        justifyContent: 'center',

        alignContent: "center",
        // flex: 1
    },
    verticalSliderContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
        // marginLeft: "20%",
    },
    projectSectionView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: pinkColor

    },
    projectSelectionButton: {
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 5,
        borderRadius: 10,
        borderColor: burgundyColor,
        backgroundColor: burgundyColor,
        alignItems: 'center',
    },
    notificationTimesButton: {
        width: 100,
        height: 100,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 50,
        backgroundColor: burgundyColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    projectSelectionButtonText: {
        fontFamily: fontFamily,
        fontSize: 12,
        alignItems: 'center',
        justifyContent: "center",
    },
    notesContainer: {
        backgroundColor: limeColor,
        height: "20%",
    },
    notesTextInput: {
        flex: 2,
        height: "20%",
    },
    completeButtonBody: {
        margin: 10,
        flex: 1,
        borderColor: whiteColor,
        backgroundColor: whiteColor,
        borderWidth: 5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    completeAndNotifSection: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    projectsNotificationsSection: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#f0f"
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