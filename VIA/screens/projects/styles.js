/* eslint-disable no-unused-vars*/
import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
/* eslint-enable no-unused-vars*/
import { StyleSheet, PixelRatio, Dimensions, Platform } from 'react-native';

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

const backgroundColor = "#4585C1"
const complimentaryColor = "#023C74"
const blueColor = "#00bbb1"

module.exports = StyleSheet.create({

     /* #region Outer Structure */
     outerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#4585C1",
    },
    /* #endregion */

    /* #region  Top Navigation */
    topNav: {
        marginBottom: 5,
        backgroundColor: backgroundColor,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: "10%",
        marginRight: "10%",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 10,
        borderTopWidth: 2,
        borderTopColor: backgroundColor,
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 2,
        paddingRight: 10,
        paddingLeft: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }

    },
    addItemButtonContainer: {
        justifyContent: "center",
    },
    addItemButtonText: {
        justifyContent: "center",
        color: complimentaryColor,
        fontSize: 50,
        color: complimentaryColor
        // shadowColor: "#000000",
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //     height: 1,
        //     width: 0
        // }
    },
    topNavLeftTitleText: {
        fontSize: 30,
        fontFamily: fontFamily,
        color: complimentaryColor,
        // shadowColor: "#000000",
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //     height: 1,
        //     width: 0
        // }
    },
    topNavCenterTitleText: {
        fontSize: 30,
        fontFamily: fontFamily,
        marginLeft: "-16%",
        color: complimentaryColor,
        // shadowColor: "#000000",
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //     height: 1,
        //     width: 0
        // }
    },
    /* #endregion */

    listItemContainer: {
        // flex: 1,
        backgroundColor: backgroundColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        // height: '100%',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,

        borderRadius: 10,
        borderTopWidth: 2,
        borderTopColor: backgroundColor,
        flexDirection: "row",
     
        marginTop: 2,
        // paddingRight: 10,
        // paddingLeft: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }

    },

    listItemContainerFinished:{
        backgroundColor: backgroundColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
        // height: '100%',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,

        borderRadius: 10,
        borderTopWidth: 2,
        borderTopColor: backgroundColor,
        flexDirection: "row",
     
        marginTop: 2,
        // paddingRight: 10,
        // paddingLeft: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    listItemTextContainer: {
        // flex: 1,
        // flexGrow: 1,
        // flexWrap: 'nowrap',
        width: 130,
        maxWidth: 130,
        marginRight: 10,
        // backgroundColor: blueColor
    },
    listItemText: {
        // height: '100%',
        color: complimentaryColor,
        fontFamily: fontFamily,
        fontSize: 18,
    },
    listItemIcon: {

    },
    checkboxAndNameContainer: {
        flexDirection: 'row',
        alignItems: "center",

    },
    checkbox: {
        backgroundColor: blueColor,
    },
    listItemActionButtonsContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-evenly',
        // marginLeft: 100,

    },
    listItemActionButton: {
        marginLeft: "3%",
        marginLeft: "3%",
        flexDirection: 'row',
        alignItems: "center",
        // marginLeft: 10,

    }
})