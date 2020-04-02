/* eslint-disable no-unused-vars*/
import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
/* eslint-enable no-unused-vars*/
import { StyleSheet, Platform } from 'react-native';

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

const shadowColor = colorsProvider.shadowColor

module.exports = StyleSheet.create({

     /* #region Outer Structure */
     outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorsProvider.routinesMainColor,
    },
    /* #endregion */

    /* #region  Top Navigation */
    topNav: {
        marginBottom: 5,
        backgroundColor: colorsProvider.routinesMainColor,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: "10%",
        marginRight: "10%",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 10,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.routinesMainColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 2,
        paddingRight: 10,
        paddingLeft: 10,
        shadowColor: shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: colorsProvider.shadow
    },
    addItemButtonContainer: {
        justifyContent: "center",
    },
    addItemButtonText: {
        justifyContent: "center",
        fontSize: colorsProvider.fontSizeAddButton,
        color: colorsProvider.routinesComplimentaryColor
    },
    topNavLeftTitleText: {
        fontSize: 30,
        fontFamily: fontFamily,
        color: colorsProvider.routinesComplimentaryColor,
    },
    topNavCenterTitleText: {
        fontSize: 30,
        fontFamily: fontFamily,
        marginLeft: "-16%",
        color: colorsProvider.routinesComplimentaryColor,
    },
    /* #endregion */

     /* #region  List Item Section */
    listItemContainer: {
        backgroundColor: colorsProvider.routinesMainColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        borderRadius: 10,
        borderTopColor: colorsProvider.homePlaceholderColor,
        flexDirection: "row",
        marginTop: 2,
        shadowColor: shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: colorsProvider.shadow,
        padding: 5,
    },

    listItemContainerFinished:{
        backgroundColor: colorsProvider.routinesMainColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        borderRadius: 10,
        borderTopWidth: 2,
        borderTopColor: colorsProvider.homePlaceholderColor,
        flexDirection: "row",
        marginTop: 2,
        shadowColor: shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: colorsProvider.shadow,
        padding: 5,
    },
    listItemTextContainer: {
        width: 130,
        maxWidth: 130,
        marginRight: 10,
    },
    listItemText: {
        color: colorsProvider.routinesComplimentaryColor,
        fontFamily: fontFamily,
        fontSize: 18,
    },
    checkboxAndNameContainer: {
        flexDirection: 'row',
        alignItems: "center",
    },
    listItemActionButtonsContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-evenly',
    },
    listItemActionButton: {
        marginLeft: "3%",
        marginLeft: "3%",
        flexDirection: 'row',
        alignItems: "center",
    }
       /* #endregion */
})