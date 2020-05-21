import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, Slider } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class DoneSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // value3Index: this.props.importance,
        };
    }

    renderImportance() {
        return (<View style={{margin: 30,}}><Slider
            style={{ width: 250, height: 100, }}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor={colorsProvider.projectsComplimentaryColor}
            minimumTrackTintColor={colorsProvider.tasksComplimentaryColor}
            maximumTrackTintColor={colorsProvider.tasksPlaceholderColor}
            value={10}

            onSlidingComplete={(value) => {
                if (value == 100) {
                    this.finishTask();
                }
                this.props.save();
            }}
            onValueChange={(value) => {
                Keyboard.dismiss()
            }}
        /></View>
)
    }

    render() {
        return this.renderImportance()
    }
}