/* eslint-disable no-unused-vars*/
import React from 'react';
/* eslint-enable no-unused-vars*/
import { StyleSheet, Platform } from 'react-native';
import * as colorsProvider from '../components/colorsProvider';
import { colors } from 'react-native-elements';


module.exports = StyleSheet.create({
    /* #region  Plus Button  */
    plusButtonContainer: {
        width: '90%',
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: colorsProvider.projectsMainColor,
        backgroundColor: colorsProvider.projectsMainColor,
        shadowColor: colorsProvider.shadowColor,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },

    plusButtonIcon: {
        marginLeft: 10,
    },
    /* #endregion */
})
