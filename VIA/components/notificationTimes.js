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
            value: this.props.percentage_done,
            notificationTimesModal: false,
            notifTimeModalVisibility: false,
            dayOfTheWeek: '',
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

    renderSingleDay(checked, name) {
        var shortenedName = name.substring(0, 3)
        if (checked)
            return (<TouchableOpacity
                onPress={() => {
                    this.setState({ dayOfTheWeek: name })
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
                        this.setState({ dayOfTheWeek: name })
                        this.RBSheet.open()
                        // this.setAddNotifTimeModalVisibility(true)
                    }}
                    style={{ borderRadius: 20, width: 45, margin: 4, backgroundColor: colorsProvider.noNotificationTime, justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={{ margin: 5, fontFamily: colorsProvider.font, fontSize: 16, color: colorsProvider.whiteColor, textAlign: 'center' }}>{shortenedName}</Text>
                </TouchableOpacity>
            )

    }

    renderAddNotifTimeModal() {
        if (this.state.notifTimeModalVisibility) {
            return <NotifTimeModal
                animationType="slide"
                transparent={true}
                closeModal={() => { this.setAddNotifTimeModalVisibility(false) }}
                visible={this.state.notifTimeModalVisibility}
                dayOfTheWeek={this.state.dayOfTheWeek}>
            </NotifTimeModal>
        }
        return null;
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
                        this.renderSingleDay(jsonArr[item].checked, jsonArr[item].name)} />
            </View>
        );
    }

    render() {
        return (<View style={{}}>
            {this.renderAddNotifTimeModal()}
            {this.renderNotificationTimes()}
            <RBSheet
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
                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity
                        style={{ marginRight: 10, marginTop: 10, }}
                        onPress={this.props.closeModal}>
                        <SIcon name={colorsProvider.close} style={{}} size={40} color={colorsProvider.incompleteColor} />
                    </TouchableOpacity>
                </View>
                <FlatList />
                <View style={{ alignItems: 'center', backgroundColor: colorsProvider.topBarColor, flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', marginBottom: 20, flexDirection: 'row', flex: 1, }}>
                        <DatePicker
                            textColor={colorsProvider.whiteColor}
                            mode="time"
                        // date={date}
                        // onDateChange={setDate}
                        />
                    </View>
                    <View style={{ height: '100%', backgroundColor: 'red', flexDirection: 'column' }}>
                        <TouchableOpacity>
                            <View style={{  width: '100%', backgroundColor: 'white' }}>
                                <Text>Set</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{  width: '100%', backgroundColor: 'white' }}>
                                <Text>Close</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
        </View>)
    }
}