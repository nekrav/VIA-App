/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, Platform } from 'react-native';
import * as colorsProvider from '../components/colorsProvider';
import { colors } from 'react-native-elements';


module.exports = StyleSheet.create({
    /* #region  Plus Button  */
    plusButtonContainer: {
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 40,
        // width: '90%',
        // borderRadius: 20,
        // paddingTop: 5,
        // paddingBottom: 5,
        // borderWidth: 1,
        borderColor: colorsProvider.projectsComplimentaryColor,
        backgroundColor: colorsProvider.projectsComplimentaryColor,
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //     height: 1,
        //     width: 0,
        // },
        // marginRight: 5,
        // flexDirection: 'row',
        // alignItems: 'center',
        // alignContent: 'center',
        // justifyContent: 'center',
    },

    plusButtonIcon: {
    },
    /* #endregion */
})
