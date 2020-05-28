import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, Keyboard } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class ParentSelection extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            name: this.props.parentName,
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({ name: newProps.parentName });
    }

    render() {
        console.warn(this.state.name)
        if (this.state.name) {
            return (
                <TouchableOpacity
                    style={{ marginLeft: "16%", flexDirection: 'row', marginBottom: '3%' }}
                    onPress={this.props.selectParent}>
                    <Text style={{ marginRight: 5 }}>
                        <SIcon name="layers" size={20} color={colorsProvider.whiteColor} />
                    </Text>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>
                        {this.state.name}
                    </Text>

                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={{ marginLeft: "16%", flexDirection: 'row', marginBottom: '3%' }}
                    onPress={this.props.selectParent}>
                    <Text style={{ marginRight: 5 }}>
                        <SIcon name="layers" size={20} color={colorsProvider.whiteColor} />
                    </Text>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>Is this part of a bigger project?
          </Text>
                </TouchableOpacity>
            );
        }
    }
}