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
        width: 30,
        height: 30,
        borderRadius: 30,
        borderColor: colorsProvider.projectsComplimentaryColor,
        backgroundColor: colorsProvider.projectsComplimentaryColor,
        marginRight: 2,
        marginTop: 2,
    },

    plusButtonIcon: {
    },
    /* #endregion */
})
