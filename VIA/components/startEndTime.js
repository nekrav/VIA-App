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

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class StartEndTime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startTime: this.props.startTime,
            endTime: this.props.endTime,
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps != null)
            this.setState({ value: parseInt(this.props.percentageDone) });
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
                }}>Start Date</Text>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.shadowColor,
                    fontSize: colorsProvider.fontSizeSmall,
                    marginTop: 10,
                    marginBottom: 10,
                }}>{this.state.dueDate}</Text>
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
                        mode="date"
                        date={this.state.newNotifTimeDate}
                        onDateChange={date => {
                            this.setState({ dueDate: date.toString() })
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
                            this.props.selectDueDate("");
                            this.RBSheet.close()
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
                            this.RBSheet.close()
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
                            this.props.selectDueDate(this.state.dueDate)
                            this.RBSheet.close()
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
                }}>Start Date</Text>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.shadowColor,
                    fontSize: colorsProvider.fontSizeSmall,
                    marginTop: 10,
                    marginBottom: 10,
                }}>{this.state.dueDate}</Text>
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
                        mode="date"
                        date={this.state.newNotifTimeDate}
                        onDateChange={date => {
                            this.setState({ dueDate: date.toString() })
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
                            this.props.selectDueDate("");
                            this.RBSheet.close()
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
                            this.RBSheet.close()
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
                            this.props.selectDueDate(this.state.dueDate)
                            this.RBSheet.close()
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
            // <View style={{ margin: 10, flexDirection: 'row', }}>
            <View style={{ margin: 10, flexDirection: 'column', }}>
                {/* <Slider
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
                }} /> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                    <Text style={{ color: this.props.color, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font }}>Start Time</Text>
                    <Text style={{ color: this.props.color, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font }}>End Time</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                    <TouchableOpacity onPress={() => { this.RBSheet.open(); setState({whichDate: startDate})}}style={{ borderBottomWidth: 1, borderBottomColor: this.props.color }}><Text style={{ color: this.props.color, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font }}>{this.state.startTime ? this.state.startTime : "No start time"}</Text></TouchableOpacity>
                    <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: this.props.color }}><Text style={{ color: this.props.color, fontSize: colorsProvider.fontButtonSize, fontFamily: colorsProvider.font, }}>{this.state.startTime ? this.state.startTime : "No end time"}</Text></TouchableOpacity>
                </View>
            </View>
            // </View>
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