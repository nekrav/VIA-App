import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, ScrollView } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class NotificationTimes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.percentage_done,
        };
    }

    renderDayOfWeekBubble(dayOfWeek) {
        return (
            <TouchableOpacity style={{ borderRadius: 45, width: 45, margin: 4, backgroundColor: colorsProvider.topBarColor, justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ margin: 10, fontFamily: colorsProvider.font, fontSize: 12, color: colorsProvider.whiteColor, textAlign: 'center' }}>{dayOfWeek}</Text>
            </TouchableOpacity>
        )
    }

    renderNotificationTimes() {
        return (<View style={{ margin: 10, flexDirection: 'row' }}>
            <View style={{ flex: 1, margin: 10, marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                {this.renderDayOfWeekBubble("Mon")}
                {this.renderDayOfWeekBubble("Tue")}
                {this.renderDayOfWeekBubble("Wed")}
                {this.renderDayOfWeekBubble("Thur")}
                {this.renderDayOfWeekBubble("Fri")}
                {this.renderDayOfWeekBubble("Sat")}
                {this.renderDayOfWeekBubble("Sun")}
            </View>
        </View>
        )
    }

    render() {
        return this.renderNotificationTimes()
    }
}