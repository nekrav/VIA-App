import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class ChildItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        return (<TouchableWithoutFeedback onPress={() => { }}>
            <TouchableOpacity
                style={{ flex: 2, backgroundColor: colorsProvider.habitsMainColor, margin: 10, }}>
                <Text>{this.props.name}</Text>
            </TouchableOpacity></TouchableWithoutFeedback>)
    }
}