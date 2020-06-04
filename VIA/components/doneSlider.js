import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class DoneSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: parseInt(this.props.percentageDone),
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps != null)
            this.setState({ value: newProps.percentageDone });
    }

    renderImportance() {
        console.warn(this.state.value)
        return (<View style={{ margin: 10, flexDirection: 'column' }}>
            <Slider
                thumbStyle={{ width: 45, height: 45, borderRadius: 45, backgroundColor: colorsProvider.whiteColor }}
                trackStyle={{ width: '100%', height: 35, borderRadius: 35, }}
                minimumValue={0}
                maximumTrackTintColor={colorsProvider.topBarColor}
                minimumTrackTintColor={colorsProvider.completeColor}
                step={1}
                maximumValue={10}
                animationType={'timing'}
                value={this.state.value}
                onSlidingComplete={value => this.props.onSlidingComplete(value)}
                onValueChange={value => {
                    this.setState({ value })
                    this.props.onValueChange(value)
                }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                <Text style={{ color: colorsProvider.whiteColor, fontSize: colorsProvider.fontSizeSmall }}>Didn't Start</Text>
                <Text style={{ color: colorsProvider.whiteColor, fontSize: colorsProvider.fontSizeSmall }}>Done</Text>
            </View>
        </View>
        )
    }

    render() {
        return this.renderImportance()
    }
}