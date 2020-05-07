import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Animated, TouchableOpacity, View, Image, Text } from "react-native";
import SIcon from 'react-native-vector-icons/dist/Ionicons';
import { Database } from '../db'

const styles = require('./styles');

export class PlusButton extends React.Component {

    render() {
        return (
            <TouchableOpacity style={styles.plusButtonContainer}
                onPress={() => {
                    this.props.action();
                }}>
                <SIcon style={styles.plusButtonIcon} name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} />
                {/* <Text style={styles.addTimeButtonText}> Add Task</Text> */}
            </TouchableOpacity>
        );
    }
}

