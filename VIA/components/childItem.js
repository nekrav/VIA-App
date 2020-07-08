import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import SwipeableItem from 'react-native-swipeable-item'
import { Database } from '../db'
import Moment from 'moment';
import IIcon from 'react-native-vector-icons/dist/Ionicons';
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';

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
            <View
                style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colorsProvider.habitsMainColor, margin: 10, borderRadius: 10, padding: 5 }}>
                <Text style={{fontFamily: colorsProvider.font, color: colorsProvider.whiteColor, fontSize: 18, marginLeft: 5, }}>{this.props.name}</Text>
                <TouchableOpacity><SIcon name={colorsProvider.trash}/></TouchableOpacity>
                <IIcon name="ios-arrow-forward"/>
                
            </View></TouchableWithoutFeedback>)
    }
}