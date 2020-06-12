import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider, colors } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, ScrollView, FlatList, Dimensions } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { NotifTimeModal } from '../modals/singleNotifTime/addNotifTimeModal';
import RBSheet from "react-native-raw-bottom-sheet";
import { Database } from '../db'
import Moment from 'moment';
import DatePicker from 'react-native-date-picker'


const screenHeight = Math.round(Dimensions.get('window').height);
const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class NotificationTimes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationTimes: this.props.notificationTimes,
            notificationTimesModal: false,
            notifTimeModalVisibility: false,
            dayOfTheWeek: '',
            dayNotificationTimes: '',
            newNotifTimeDate: todayDate,
            newNotifTimeString: '',
        };
    }

    // renderDayOfWeekBubble(dayOfWeek) {
    //     var daysWithNotifications = '';

    //     var jsonArr = JSON.parse("[" + this.state.notificationTimes + "]");

    //     // Object.keys(jsonArr).map(key => {
    //     //     console.warn(jsonArr)
    //     Object.keys(jsonArr).forEach(key => {
    //         console.warn(key)
    //         if (jsonArr[key].times.length > 0 && jsonArr[key].checked == true) {
    //             console.warn("Befawef")
    //             return (
    //                 <TouchableOpacity style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.topBarColor, justifyContent: 'center', alignContent: 'center' }}>
    //                     <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 12, color: colorsProvider.whiteColor, textAlign: 'center' }}>{jsonArr[key].value}</Text>
    //                 </TouchableOpacity>
    //             )

    //         } else {
    //             console.warn("AAAA")
    //             return (
    //                 <TouchableOpacity style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.incompleteColor, justifyContent: 'center', alignContent: 'center' }}>
    //                     <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 12, color: colorsProvider.whiteColor, textAlign: 'center' }}>{dayOfWeek}</Text>
    //                 </TouchableOpacity>
    //             )
    //         }
    //     });
    //     // return (
    //     //     <TouchableOpacity style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.topBarColor, justifyContent: 'center', alignContent: 'center' }}>
    //     //         <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 12, color: colorsProvider.whiteColor, textAlign: 'center' }}>{dayOfWeek}</Text>
    //     //     </TouchableOpacity>
    //     // )
    // }

    setAddNotifTimeModalVisibility(visible) {
        this.setState({ notifTimeModalVisibility: visible })
    }

    renderSingleDay(checked, name, times) {
        var shortenedName = name.substring(0, 3)
        if (times.length > 0)
            return (<TouchableOpacity
                onPress={() => {
                    this.setState({ dayOfTheWeek: name, dayNotificationTimes: times })
                    this.RBSheet.open()
                    // this.setAddNotifTimeModalVisibility(true)
                }}
                style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.topBarColor, justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 16, color: colorsProvider.whiteColor, textAlign: 'center' }}>{shortenedName}</Text>
            </TouchableOpacity>)
        else
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ dayOfTheWeek: name, dayNotificationTimes: times })
                        this.RBSheet.open()
                        // this.setAddNotifTimeModalVisibility(true)
                    }}
                    style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.noNotificationTime, justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 16, color: colorsProvider.whiteColor, textAlign: 'center' }}>{shortenedName}</Text>
                </TouchableOpacity>
            )

    }

    renderNotificationTimes() {
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
                <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: 10, marginTop: 10 }}>
                    <SIcon name="bell" size={20} color={colorsProvider.topBarColor} />
                    <Text style={{ marginLeft: 10, marginBottom: 5, fontFamily: colorsProvider.font, fontSize: 16, color: colorsProvider.topBarColor }}>
                        Notification Times
                </Text>

                </View>
                <FlatList
                    horizontal={true}
                    keyExtractor={(item) => jsonArr[item].key}
                    scrollEnabled={false}
                    data={Object.keys(jsonArr)}
                    contentContainerStyle={{ alignItems: 'center', marginLeft: 2, marginRight: 2, marginBottom: 10, }}
                    style={{}}
                    renderItem={({ item }) =>
                        this.renderSingleDay(jsonArr[item].checked, jsonArr[item].name, jsonArr[item].times)} />
            </View>
        );
    }

    formatAMPM(date) {
        // console.warn(date)
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    renderBottomSlidingPane() {
        return (<RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            closeOnPressMask={true}
            dragFromTopOnly={true}
            height={screenHeight / 1.36}
            openDuration={250}
            customStyles={{

                container: {
                    // flexDirection: 'column',
                    // alignItems: "center"
                }
            }}>
            {/* <TouchableOpacity style={{ backgroundColor: colorsProvider.topBarColor }} onPress={() => { this.RBSheet.close() }}><Text>Close</Text></TouchableOpacity>
                <View><Text>{this.state.dayOfTheWeek}</Text></View> */}
            <View style={{ }}>
                <Text>{this.state.dayOfTheWeek}</Text>
                {/* <TouchableOpacity
                    style={{ marginRight: 10, marginTop: 10, }}
                    onPress={() => {
                        this.RBSheet.close()
                        this.setState({ dayNotificationTimes: '' })
                    }}>
                    <SIcon name={colorsProvider.close} style={{}} size={40} color={colorsProvider.incompleteColor} />
                </TouchableOpacity> */}
            </View>
            <FlatList
                data={this.state.dayNotificationTimes}
                contentContainerStyle={{ marginLeft: 10, marginRight: 10, alignContent: 'center' }}
                style={{ marginLeft: 10, marginRight: 10 }}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{ flex: 1, borderRadius: 10, backgroundColor: colorsProvider.topBarColor}}
                        onPress={() => {
                            var index = day.item.times.indexOf(item)
                            if (index !== -1) {
                                var newArr = day.item.times
                                newArr.splice(index, 1)
                                day.item.times = newArr
                                var newMain = this.state.times
                                this.setState({ times: newMain })
                            }
                        }}>
                        <View style={{}}>
                            <Text style={{}}>{item}</Text>
                            <SIcon style={{}} name="minus" size={16} color={colorsProvider.whiteColor} />
                        </View>
                    </TouchableOpacity>}
            />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: colorsProvider.topBarColor, flexDirection: 'row', }}>
                    <View style={{ flex: 1, alignItems: 'center', marginBottom: 20, flexDirection: 'row', flex: 1, }}>
                        <DatePicker
                            textColor={colorsProvider.whiteColor}
                            mode="time"
                            date={this.state.newNotifTimeDate}
                            onDateChange={date => {
                                // var newArr = this.state.dayNotificationTimes
                                // newArr.splice(index, 1)
                                // day.item.times = newArr
                                // var newMain = this.state.times
                                dateDate = date;
                                dateString = date.getHours().toString() + ":" + date.getMinutes().toString();
                                // console.warn(dateString)
                                this.setState({ newNotifTimeString: dateString, newNotifTimeDate: dateDate })
                            }}
                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', backgroundColor: 'red', flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => {
                        var oldArr = this.state.dayNotificationTimes
                        var dateTime = this.formatAMPM(this.state.newNotifTimeDate)
                        newArr = oldArr.concat(dateTime)
                        this.setState({ dayNotificationTimes: newArr })
                    }}>
                        <View style={{ width: '100%', backgroundColor: 'white' }}>
                            <Text>Set</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.RBSheet.close()
                        this.setState({ dayNotificationTimes: '' })
                    }}>
                        <View style={{ width: '100%', backgroundColor: 'white' }}>
                            <Text>Close</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </RBSheet>)
    }

    render() {
        return (<View style={{}}>
            {this.renderNotificationTimes()}
            {this.renderBottomSlidingPane()}
        </View>)
    }
}