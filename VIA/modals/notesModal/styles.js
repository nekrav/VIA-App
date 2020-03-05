/* eslint-disable no-unused-vars*/
import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
/* eslint-enable no-unused-vars*/
import { StyleSheet,Platform } from 'react-native';

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

module.exports = StyleSheet.create({

    /* #region Outer Structure */
    outerView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    outerViewDone: {
        flex: 2,
        flexDirection: 'column',
    },
    /* #endregion */

    /* #region  Top Navigation */
    topNav: {
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    trashButton: {
        marginRight: "8%",
        justifyContent: "center",

    },
    topNavBackButton: {
        marginLeft: "8%",
    },
    /* #endregion */

    /* #region  Notes Section */
    notesContainer: {
        flex: 1,
        alignItems: 'flex-start',

    },
    notesTextInput: {
        fontSize: 24,
        fontFamily: fontFamily,
        marginLeft: 10,
        marginRight: 10,
    },
    /* #endregion */

    /* #region Close Bottom Buttons Section */
    bottomButtonContainer: {
        marginLeft: 50,
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        borderWidth: 2,
        marginRight: 50,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    modifiedBottomButtonContainer: {
        marginLeft: 50,
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        marginRight: 50,
        shadowColor: colorsProvider.shadowColor,
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
        color: colorsProvider.homeTextColor,
    },
    modifiedBottomButtonText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: fontFamily,
        color: colorsProvider.whiteColor,
    },
    /* #endregion */
})