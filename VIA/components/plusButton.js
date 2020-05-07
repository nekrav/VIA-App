import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Animated, TouchableOpacity, View, Image, Text } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'

const styles = require('./styles');

export class PlusButton extends React.Component {

    render() {
        return (
            <TouchableOpacity style={styles.plusButtonContainer}
                onPress={() => {
                    this.props.action();
                }}>
                <SIcon style={styles.plusButtonIcon} name="plus" size={16} color={colorsProvider.shadowColor} />
                {/* <Text style={styles.addTimeButtonText}> Add Task</Text> */}
            </TouchableOpacity>
        );
    }
}

