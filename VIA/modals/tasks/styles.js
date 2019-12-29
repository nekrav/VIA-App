/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

const buttonBackgroundColor = '#3a506b'
const titleFontSize = 24
const bodyFontSize = 20
const leftMargin = 5
const fontFamily = "Futura"

const backgroundColor = "#f2f2f2"
const blueColor = "#068ae8"
const textColor = "#2d3142"
const finishedBackgroundColor = "#a8ffe0"

const { width, height } = Dimensions.get('window');


module.exports = StyleSheet.create({

    outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: backgroundColor,
    },
    outerViewDone: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: finishedBackgroundColor,
    },
    topNav: {
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    trashButton: {
        marginRight: "8%",
        justifyContent: "center",
       
    },
    topNavText: {
        fontFamily: fontFamily,
        fontSize: titleFontSize
    },
    backButton: {
        marginLeft: "8%",
    },
    nameTextInput: {
        fontSize: 28,
        fontFamily: fontFamily,
        color: "black",
        marginLeft: leftMargin,
    },
    createNameTextInput: {
        fontSize: 28,
        fontFamily: fontFamily,
        color: "black",
        marginLeft: 5,
       
    },
    createTitleContainer: {
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 50,
        backgroundColor: "#e6e6e6",
        marginTop: 2,
        borderTopWidth: 2,
        borderTopColor: "#e8e8e8",
        flexDirection: "row"
    },
    titleContainer: {
        flexDirection: "row"
    },
    projectSectionContainer: {

    },
    dateContainer: {
        backgroundColor: blueColor,
    },
    completeButtonContainer: {
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
        fontFamily: fontFamily,
        color: textColor,
        fontSize: 30,
    },
    projectSectionView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: textColor,
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    projectSelectionButton: {
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
    },
    notificationTimesButton: {
        width: 120,
        height: 120,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 60,
        borderWidth: 1,
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
        height: "100%",
        flex: 1,
    },
    notesTitle:{
        fontSize: 18,
    },
    notesTextInput: {
        // flex: 2,
        fontSize: 18,
    },
    completeButtonBody: {
        margin: 10,
        flex: 1,
        borderColor: blueColor,
        backgroundColor: blueColor,
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
    },
    notificationTimesText: {
        fontFamily: fontFamily,
        fontSize: 14,
        alignItems: 'center',
        justifyContent: "center",
        margin: 2,
    },
    slidersSection: {
        flexDirection: "column",
        justifyContent: 'center',
    },
    slidersTitlesContainer: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    sliderTitleContainerLeft: {
        marginRight: "8%",
        marginTop: "2%",
    },
    sliderTitleContainerRight: {
        marginLeft: "10%",
        marginTop: "2%",
    },
    sliderTitleContainerCenter: {
        marginTop: "2%",
    },
    sliderTitle: {
        fontFamily: fontFamily,
        fontSize: 24,
    },
    slidersContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: "35%",
        marginBottom: "35%",
    },
    sliderContainerLeft: {
        marginRight: -40,
    },
    sliderContainerRight: {
        marginLeft: -40,
    },
    sliderContainerCenter: {
        marginTop: "2%",
    },
    bottomButtonsContainer: {
        borderTopColor: textColor,
        paddingTop: 18,
        borderTopWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    bottomButtonLeft: {
        marginLeft: 50,
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: blueColor,
        backgroundColor: blueColor,
    },
    bottomButtonRight: {
        marginLeft: 50,
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: blueColor,
        backgroundColor: backgroundColor,
        marginRight: 50,
    },
    bottomButtonText: {
        fontSize: 18,
        textAlign:'center',
        fontFamily: fontFamily,
    },
})