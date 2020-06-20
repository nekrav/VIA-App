import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';

const todayDate = new Date();

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class SavePanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            percentageDone: this.props.percentageDone,
            completed: this.props.completed,
            finishedDate: this.props.finishedDate,
        };
    }

    renderCompleteButton() {
        if (this.state.completed == "true") {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        backgroundColor: colorsProvider.completeButtonColor
                    }}
                    onLongPress={() => {
                        this.props.onUnCompletePressed()
                        this.setState({ completed: "false", finishedDate: "null", percentageDone: 0 })

                    }}>
                    <Text style={{
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        fontSize: colorsProvider.fontSizeMain,
                        fontFamily: colorsProvider.font,
                        color: colorsProvider.topBarColor
                    }}>Done
                    {/* <Text style={{ fontSize: 14, }}>(finished on: {Moment(new Date(this.state.finishedDate.toString())).format(dateDisplayFormat)})</Text> */}
                    </Text>
                </TouchableOpacity>
            )
        }
        else
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        backgroundColor: colorsProvider.incompleteColor
                    }}
                    onLongPress={() => {
                        this.props.onUnCompletePressed()
                        this.setState({ completed: "false", finishedDate: "null", percentageDone: 0 })
                    }}
                    onPress={() => {
                        this.setState({ completed: "true", finishedDate: new Date(Date.now()).toString(), percentageDone: 10 })
                        this.props.onCompletePressed()
                    }}>
                    <Text style={{
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                        fontSize: colorsProvider.fontSizeMain,
                        fontFamily: colorsProvider.font,
                        color: colorsProvider.whiteColor
                    }}>Complete</Text>
                </TouchableOpacity >)
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
                                    // var oldArr = this.state.dayNotificationTimes
                                    // oldArr.splice(index, 1)
                                    // var arrayOfAllTimes = JSON.parse(this.state.notificationTimes)
                                    // selectedDay = arrayOfAllTimes.find(theDay => theDay.name === this.state.dayOfTheWeek)
                                    // selectedDay.times = oldArr
                                    // var newTimes = JSON.stringify(arrayOfAllTimes)
                                    // this.props.addNotificationTime(newTimes)
                                    // this.setState({ dayNotificationTimes: oldArr })


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
        return (
            <View>
                {this.renderCompleteButton()}
            </View>)
    }
}