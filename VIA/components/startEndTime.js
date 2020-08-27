import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Slider } from 'react-native-elements';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, Dimensions } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';
import DatePicker from 'react-native-date-picker'

import RBSheet from "react-native-raw-bottom-sheet";


const todayDate = new Date();
const screenHeight = Math.round(Dimensions.get('window').height);
const timeFormat = "hh:mm A"
const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class StartEndTime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            datePickerStartTime: this.props.startTime != "" ? this.props.startTime : todayDate,
            datePickerEndTime: this.props.endTime != "" ? this.props.endTime : todayDate,
            differenceBetweenDates: ''
        };
    }

    getDifferenceBetweenTimes(startTime, endTime) {
        const start = new Date("01/01/2007 " + startTime);
        const end = new Date("01/01/2007 " + endTime);
        diffMs = (end.getTime() - start.getTime()) / 1000;
        var diffMins = Math.round(((diffMs % 1000) % 3600000) / 60); // minutes
        if (diffMins > 0) 
            return diffMins
        else 
            return 0;
    }

    renderStartDateBottomPane() {
        return (<RBSheet
            ref={ref => {
                this.RBStartSheet = ref;
            }}
            closeOnPressMask={true}
            onClose={() => {
            }}
            dragFromTopOnly={true}
            height={screenHeight / 2.10}
            openDuration={250}>
            <View style={{
                marginTop: 10,
                marginLeft: 20,
                flexDirection: 'column',
                justifyContent: 'space-around'
            }}>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.topBarColor,
                    fontSize: colorsProvider.fontSizeMain
                }}>Start Time</Text>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.shadowColor,
                    fontSize: colorsProvider.fontSizeSmall,
                    marginTop: 10,
                    marginBottom: 10,
                }}>{this.state.startTime}</Text>
            </View>

            <View style={{ flexDirection: 'column', }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colorsProvider.topBarColor,
                }}>
                    <DatePicker
                        textColor={colorsProvider.whiteColor}
                        mode="time"
                        date={this.state.newNotifTimeDate}
                        onDateChange={date => {
                            this.setState({ startTime: Moment(date).format(timeFormat) })
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colorsProvider.redColor,
                            margin: 10,
                            borderRadius: 10,
                            alignContent: 'center',
                        }}
                        onPress={() => {
                            this.setState({ startTime: '' });
                            this.RBStartSheet.close()
                        }}>
                        <Text style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: colorsProvider.fontSizeChildren,
                            fontFamily: colorsProvider.fontFamily,
                            color: colorsProvider.whiteColor
                        }}>Delete Start Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            backgroundColor: colorsProvider.closeButtonColor,
                            margin: 10,
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            this.RBStartSheet.close()
                        }}>
                        <Text style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: colorsProvider.fontSizeChildren,
                            fontFamily: colorsProvider.fontFamily,
                            color: colorsProvider.whiteColor
                        }}>Close</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            backgroundColor: colorsProvider.setButtonColor,
                            margin: 10,
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            this.props.setStartTime(this.state.startTime)
                            this.RBStartSheet.close()
                        }}>
                        <Text style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: colorsProvider.fontSizeChildren,
                            fontFamily: colorsProvider.fontFamily,
                            color: colorsProvider.whiteColor
                        }}>Save</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </RBSheet>)
    }

    renderEndDateBottomPane() {
        return (<RBSheet
            ref={ref => {
                this.RBEndSheet = ref;
            }}
            closeOnPressMask={true}
            onClose={() => {
            }}
            dragFromTopOnly={true}
            height={screenHeight / 2.10}
            openDuration={250}>
            <View style={{
                marginTop: 10,
                marginLeft: 20,
                flexDirection: 'column',
                justifyContent: 'space-around'
            }}>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.topBarColor,
                    fontSize: colorsProvider.fontSizeMain
                }}>End Date</Text>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.shadowColor,
                    fontSize: colorsProvider.fontSizeSmall,
                    marginTop: 10,
                    marginBottom: 10,
                }}>{this.state.endTime}</Text>
            </View>

            <View style={{ flexDirection: 'column', }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colorsProvider.topBarColor,
                }}>
                    <DatePicker
                        textColor={colorsProvider.whiteColor}
                        mode="time"
                        date={this.state.newNotifTimeDate}
                        onDateChange={date => {
                            this.props.setEndTime(date)
                            this.setState({ endTime: Moment(date).format(timeFormat) })
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colorsProvider.redColor,
                            margin: 10,
                            borderRadius: 10,
                            alignContent: 'center',
                        }}
                        onPress={() => {
                            this.props.setEndTime('');
                            this.RBEndSheet.close()
                        }}>
                        <Text style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: colorsProvider.fontSizeChildren,
                            fontFamily: colorsProvider.fontFamily,
                            color: colorsProvider.whiteColor
                        }}>Delete Due Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            backgroundColor: colorsProvider.closeButtonColor,
                            margin: 10,
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            this.RBEndSheet.close()
                        }}>
                        <Text style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: colorsProvider.fontSizeChildren,
                            fontFamily: colorsProvider.fontFamily,
                            color: colorsProvider.whiteColor
                        }}>Close</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            backgroundColor: colorsProvider.setButtonColor,
                            margin: 10,
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            this.props.setEndTime(this.state.endTime)
                            this.RBEndSheet.close()
                        }}>
                        <Text style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: colorsProvider.fontSizeChildren,
                            fontFamily: colorsProvider.fontFamily,
                            color: colorsProvider.whiteColor
                        }}>Save</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </RBSheet>)
    }


    renderDates() {
        return (
            <View style={{ margin: 10, flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                    <Text style={{ color: this.props.color, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font }}>Start Time</Text>
                    <Text style={{ color: this.props.color, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font }}>Duration</Text>

                    <Text style={{ color: this.props.color, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font }}>End Time</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                    <TouchableOpacity
                        onPress={() => { this.RBStartSheet.open() }}
                        style={{ borderBottomWidth: 1, borderBottomColor: this.props.color }}>
                        <Text
                            style={{ color: this.props.color, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font }}>
                            {this.state.startTime ? this.state.startTime : "No start time"}
                        </Text>
                    </TouchableOpacity>

                    <Text style={{ color: this.props.color, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font }}>{this.getDifferenceBetweenTimes(this.state.startTime, this.state.endTime)} {this.getDifferenceBetweenTimes(this.state.startTime, this.state.endTime) ? "minutes" : ""} </Text>
                    <TouchableOpacity
                        onPress={() => { this.RBEndSheet.open(); }}
                        style={{ borderBottomWidth: 1, borderBottomColor: this.props.color }}>
                        <Text style={{ color: this.props.color, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font, }}>
                            {this.state.endTime ? this.state.endTime : "No end time"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (<View>
            {this.renderEndDateBottomPane()}
            {this.renderStartDateBottomPane()}

            {this.renderDates()}
        </View>
        )
    }
}