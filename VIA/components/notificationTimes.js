import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider, colors } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, ScrollView, FlatList } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { NotificationTimesModal } from '../modals/notificationTimes/notificationTimesModal';

import { Database } from '../db'
import Moment from 'moment';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class NotificationTimes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationTimes: this.props.notificationTimes,
            value: this.props.percentage_done,
            notificationTimesModal: false,
        };
    }

    renderDayOfWeekBubble(dayOfWeek) {
        var daysWithNotifications = '';

        var jsonArr = JSON.parse("[" + this.state.notificationTimes + "]");

        // Object.keys(jsonArr).map(key => {
        //     console.warn(jsonArr)
        Object.keys(jsonArr).forEach(key => {
            console.warn(key)
            if (jsonArr[key].times.length > 0 && jsonArr[key].checked == true) {
                console.warn("Befawef")
                return (
                    <TouchableOpacity style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.topBarColor, justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 12, color: colorsProvider.whiteColor, textAlign: 'center' }}>{jsonArr[key].value}</Text>
                    </TouchableOpacity>
                )

            } else {
                console.warn("AAAA")
                return (
                    <TouchableOpacity style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.incompleteColor, justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 12, color: colorsProvider.whiteColor, textAlign: 'center' }}>{dayOfWeek}</Text>
                    </TouchableOpacity>
                )
            }
        });
        // return (
        //     <TouchableOpacity style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.topBarColor, justifyContent: 'center', alignContent: 'center' }}>
        //         <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 12, color: colorsProvider.whiteColor, textAlign: 'center' }}>{dayOfWeek}</Text>
        //     </TouchableOpacity>
        // )
    }

    setNotificationTimesVisibility(visible) {
        this.setState({ notificationTimesModal: visible })
    }

    renderNotificationTimesModal() {
        if (this.state.notificationTimesModal) {
            return (
                <NotificationTimesModal
                    animationType="fade"
                    transparent={true}
                    saveButtonBackgroundColor={colorsProvider.tasksComplimentaryColor}
                    disabledSaveButtonBackgroundColor={colorsProvider.tasksComplimentaryColor}
                    times={this.state.notificationTimes ? JSON.parse('[' + this.state.notificationTimes + ']') : ''}
                    setDate={item => {
                        // this.props.editNotificationTime(item);
                        // this.setState({ itemNotificationTimes: item });
                    }}
                    closeModal={() => {
                        // notifier.scheduleAllNotifications();
                        this.setNotificationTimesVisibility(false);
                    }}
                ></NotificationTimesModal>
            );
        }
        return null;
    }

    renderSingleDay(checked, name) {
        var shortenedName = name.substring(0, 3)
        if (checked)
            return (<TouchableOpacity style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.topBarColor, justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 16, color: colorsProvider.whiteColor, textAlign: 'center' }}>{shortenedName}</Text>
            </TouchableOpacity>)
        else
            return (
                <TouchableOpacity style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.noNotificationTime, justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 16, color: colorsProvider.whiteColor, textAlign: 'center' }}>{shortenedName}</Text>
                </TouchableOpacity>
            )

    }

    renderNotificationTimes() {

        // return (<View style={{ margin: 10, flexDirection: 'row' }}>
        //     <View style={{ flex: 1, margin: 10, marginLeft: 10, marginRight: 10, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
        //         {this.renderDayOfWeekBubble("Mon")}
        //         {this.renderDayOfWeekBubble("Tue")}
        //         {this.renderDayOfWeekBubble("Wed")}
        //         {this.renderDayOfWeekBubble("Thurs")}
        //         {this.renderDayOfWeekBubble("Fri")}
        //         {this.renderDayOfWeekBubble("Sat")}
        //         {this.renderDayOfWeekBubble("Sun")}
        //     </View>
        // </View>
        // )
        // if (this.state.notificationTimes != '') {
        var daysWithNotifications = '';

        var jsonArr = JSON.parse("[" + this.state.notificationTimes + "]");
        if (this.state.notificationTimes != '') {
            Object.keys(jsonArr).map(key => {
                if (jsonArr[key].times.length > 0 && jsonArr[key].checked == true) {
                    daysWithNotifications = daysWithNotifications.concat(
                        jsonArr[key].name + ', '
                    );
                }
            });
        }
        return (
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10, marginTop: 10}}>
                    <SIcon name="bell" size={20} color={colorsProvider.topBarColor} />
                    <Text style={{ marginLeft: 10, marginBottom: 5, fontFamily: colorsProvider.font, fontSize: 16, color: colorsProvider.topBarColor }}>
                        Notification Times
                </Text>

                </View>
                <FlatList
                    horizontal={true}
                    scrollEnabled={false}
                    data={Object.keys(jsonArr)}
                    contentContainerStyle={{ alignItems: 'center', marginLeft: 2, marginRight: 2, marginBottom: 10,}}
                    style={{}}
                    renderItem={({ item }) =>
                        this.renderSingleDay(jsonArr[item].checked, jsonArr[item].name)} />
                {/* </View> */}
            </View>
            // <TouchableOpacity
            //     style={{}}
            //     onPress={() => {
            //         this.setNotificationTimesVisibility(true)
            //     }}>
            //     <Text style={{}}>
            //         {daysWithNotifications}
            //     </Text>

            //     <Text style={{}}>
            //         <SIcon name="bell" size={20} color={colorsProvider.tasksComplimentaryColor} />
            //     </Text>
            // </TouchableOpacity>
        );
        // }
        // return (
        //     <TouchableOpacity
        //         style={{}}
        //         onPress={() => {
        //             this.setNotificationTimesVisibility(true)
        //         }}>
        //         <Text style={{}}>
        //             When would you like to be notified?
        // </Text>

        // <Text style={{}}>
        //     <SIcon name="bell" size={20} color={colorsProvider.tasksPlaceholderColor} />
        // </Text>
        //     </TouchableOpacity>
        // );
    }

    render() {
        return (<View>
            {this.renderNotificationTimesModal()}
            {this.renderNotificationTimes()}
        </View>)
    }
}