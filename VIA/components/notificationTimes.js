import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider, colors } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, ScrollView, FlatList, Dimensions } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/FontAwesome';

import { NotifTimeModal } from '../modals/singleNotifTime/addNotifTimeModal';
import RBSheet from "react-native-raw-bottom-sheet";
import { Database } from '../db'
import Moment from 'moment';
import DatePicker from 'react-native-date-picker'
import { Notifier } from '../notifier/notifier'

const screenHeight = Math.round(Dimensions.get('window').height);
const todayDate = new Date();
const notifier = new Notifier;
const timeFormat = "hh:mm A"

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

const emptyTimes = [
    {
        key: "1",
        name: "Monday",
        checked: false,
        times: []
    },
    {
        key: "2",
        name: "Tuesday",
        checked: false,
        times: []
    },
    {
        key: "3",
        name: "Wednesday",
        checked: false,
        times: []
    },
    {
        key: "4",
        name: "Thursday",
        checked: false,
        times: []
    },
    {
        key: "5",
        name: "Friday",
        checked: false,
        times: []
    },
    {
        key: "6",
        name: "Saturday",
        checked: false,
        times: []
    },
    {
        key: "7",
        name: "Sunday",
        checked: false,
        times: []
    },
]

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
                    }}
                    style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.noNotificationTime, justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 16, color: colorsProvider.whiteColor, textAlign: 'center' }}>{shortenedName}</Text>
                </TouchableOpacity>
            )

    }

    renderNotificationTimes() {
        // var daysWithNotifications = '';
        var jsonArr = ''
        if (this.state.notificationTimes != "") {
            jsonArr = JSON.parse(this.state.notificationTimes);
        } else {
            jsonArr = emptyTimes
            this.setState({notificationTimes: JSON.stringify(emptyTimes)})
        }
        
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
                    this.renderSingleDay(jsonArr[item].checked, jsonArr[item].name, jsonArr[item].times)} 
                    renderItem={({ item }) =>
                        this.renderSingleDay(jsonArr[item].checked, jsonArr[item].name, jsonArr[item].times)} 
                        />
            </View>
        );
    }

    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    sortByTime(a, b) {
        var time = new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
        timeHour = time.getHours();
        timeMinute = time.getMinutes();
        return formatAMPM(time)
    }


    renderBottomSlidingPane() {
        return (<RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            closeOnPressMask={true}
            onClose={() => {
                notifier.scheduleAllNotifications();
            }}
            dragFromTopOnly={true}
            height={screenHeight / 1.36}
            openDuration={250}>
            <View style={{
                marginTop: 10,
                marginLeft: 20,
            }}>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.topBarColor,
                    fontSize: colorsProvider.fontSizeMain
                }}>{this.state.dayOfTheWeek}</Text>
            </View>
            <FlatList
                data={this.state.dayNotificationTimes}
                contentContainerStyle={{ marginLeft: 10, marginRight: 10, alignContent: 'center' }}
                style={{ marginLeft: 10, marginRight: 10 }}
                renderItem={({ item }) =>
                    <View style={{
                        flex: 1,
                        borderRadius: 10,
                        backgroundColor: colorsProvider.topBarColor,
                        marginTop: 10,
                        marginBottom: 10,
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{
                                marginRight: 5,
                                marginLeft: 10,
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: colorsProvider.fontSizeChildren,
                                fontFamily: colorsProvider.fontFamily,
                                color: colorsProvider.whiteColor
                            }}>{item}</Text>
                            <TouchableOpacity onPress={() => {
                                var index = this.state.dayNotificationTimes.indexOf(item)
                                if (index !== -1) {
                                    var oldArr = this.state.dayNotificationTimes
                                    oldArr.splice(index, 1)
                                    var arrayOfAllTimes = JSON.parse(this.state.notificationTimes)
                                    selectedDay = arrayOfAllTimes.find(theDay => theDay.name === this.state.dayOfTheWeek)
                                    selectedDay.times = oldArr
                                    var newTimes = JSON.stringify(arrayOfAllTimes)

                                    this.props.addNotificationTime(newTimes)
                                    this.setState({ dayNotificationTimes: oldArr, notificationTimes: newTimes })
                                }
                            }}>
                                <SIcon style={{ marginRight: 10, }} name={colorsProvider.trash} size={colorsProvider.fontSizeMain} color={"#B61D1D"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
            <View style={{ flexDirection: 'row', }}>
                <View style={{
                    flex: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colorsProvider.topBarColor,
                }}>
                    <DatePicker
                        textColor={colorsProvider.whiteColor}
                        mode="time"
                        date={this.state.newNotifTimeDate}
                        onDateChange={date => {
                            dateDate = date;
                            dateString = date.getHours().toString() + ":" + date.getMinutes().toString();
                            this.setState({ newNotifTimeString: dateString, newNotifTimeDate: dateDate })
                        }}
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colorsProvider.setButtonColor
                        }}
                        onPress={() => {
                            var oldArr = this.state.dayNotificationTimes
                            var dateTime = Moment(new Date(this.state.newNotifTimeDate)).format(timeFormat)
                            newArr = oldArr.concat(dateTime)
                            var arrayOfAllTimes = JSON.parse(this.state.notificationTimes)
                            selectedDay = arrayOfAllTimes.find(theDay => theDay.name === this.state.dayOfTheWeek)
                           
                            selectedDay.times = newArr
                            var newTimes = JSON.stringify(arrayOfAllTimes)
                            this.props.addNotificationTime(newTimes)
                            this.setState({ dayNotificationTimes: newArr, notificationTimes: newTimes })
                        }}>
                        <Text style={{
                            marginRight: 5,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: colorsProvider.fontSizeChildren,
                            fontFamily: colorsProvider.fontFamily,
                            color: colorsProvider.whiteColor
                        }}>Set</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colorsProvider.closeButtonColor
                        }}
                        onPress={() => {
                            this.RBSheet.close()
                            this.setState({ dayNotificationTimes: '' })
                            notifier.scheduleAllNotifications();
                        }}>
                        <Text style={{
                            marginRight: 5,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: colorsProvider.fontSizeChildren,
                            fontFamily: colorsProvider.fontFamily,
                            color: colorsProvider.whiteColor
                        }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </RBSheet>)
    }

    render() {
        return (<View>
            {this.renderNotificationTimes()}
            {this.renderBottomSlidingPane()}
        </View>)
    }
}