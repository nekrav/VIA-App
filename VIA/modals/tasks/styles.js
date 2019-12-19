/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, PixelRatio } from 'react-native';

const buttonBackgroundColor = '#3a506b'
const titleFontSize = 24
const bodyFontSize = 20
const leftMargin = 5
const fontFamily = "Futura"

const backgroundColor = "#f2f2f2"
const textColor = "#2d3142"
const buttonColor = "#068ae8"
const otherTextColor = "#4f5d75"
const finishedBackgroundColor = "#a8ffe0"

const whiteColor = "#068ae8"
const blackColor = "#000"
const limeColor = backgroundColor
const burgundyColor = backgroundColor
const yellowColor = backgroundColor
const redColor = backgroundColor
const blueColor = backgroundColor
const pinkColor = backgroundColor

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
        marginLeft: leftMargin,
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
        backgroundColor: pinkColor,
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
    },
    verticalSliderContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
    },
    projectSectionView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: pinkColor,
        borderColor: textColor,
        borderTopWidth: 2,
        borderBottomWidth: 2,

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
        fontSize: 18,
        alignItems: 'center',
        justifyContent: "center",
        marginLeft: leftMargin,
    },
    notesContainer: {
        borderTopColor: textColor,
        borderTopWidth: 2,
        backgroundColor: limeColor,
        height: "100%",
    },
    notesTitle:{
        fontSize: 18,
    },
    notesTextInput: {
        flex: 2,
        fontSize: 18,
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
        backgroundColor: pinkColor,
    },
    notificationTimesText: {
        fontFamily: fontFamily,
        fontSize: 14,
        alignItems: 'center',
        justifyContent: "center",
    },
})