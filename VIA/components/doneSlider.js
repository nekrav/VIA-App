import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';



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
            this.setState({ value: parseInt(this.props.percentageDone) });
    }

    renderDoneSlider() {
        return (<View style={{ margin: 10, flexDirection: 'column', }}>
            <Slider
                thumbStyle={{ width: 45, height: 45, borderRadius: 45, backgroundColor: colorsProvider.topBarColor }}
                trackStyle={{ width: '100%', height: 35, borderRadius: 35, }}
                minimumValue={0}
                maximumTrackTintColor={colorsProvider.doneSliderNotFinished}
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
                <Text style={{ color: colorsProvider.topBarColor, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font }}>Didn't Start</Text>
                <Text style={{ color: colorsProvider.topBarColor, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font }}>Done</Text>
            </View>
        </View>
        )
    }

    render() {
        return this.renderDoneSlider()
    }
}