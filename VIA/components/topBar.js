import React from 'react';
import * as colorsProvider from './colorsProvider';
import { Animated, TouchableOpacity, View, Image, Text, TextInput, Keyboard, TouchableWithoutFeedback, Dimensions } from "react-native";
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { Database } from '../db'
import Moment from 'moment';
import { ImportanceRadio } from './importanceRadio';
import { ParentSelection } from './parentSelection';
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from 'react-native-date-picker'

const todayDate = new Date();
const screenHeight = Math.round(Dimensions.get('window').height);

const fontFamily = Platform.OS == "ios" ? colorsProvider.font : colorsProvider.font

export class TopBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            importanceValue: this.props.importance,
            parent: this.props.parent,
            parentName: this.props.parentName,
            dateModalVisibility: false,
            dueDate: this.props.dueDate
        };
    }

    componentDidMount() {
        if (this.props.fromCreate) {
            this.nameTextInput.focus()
        }
    }


    getDueDate(date) {
        if (this.getNumberOfDaysLeft(date) === 0) {
            return <Text style={{ color: colorsProvider.whiteColor }}>Due Today</Text>
        }
        else if (this.getNumberOfDaysLeft(date) < 0) {
            return (<View style={{ flexDirection: 'column', marginTop: 15, marginRight: 15, marginLeft: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    this.RBSheet.open()
                }}>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>{Moment(date).format('DD/MM/YY')}</Text>
                </TouchableOpacity>
                <Text style={{ color: colorsProvider.whiteColor }}>{Math.abs(this.getNumberOfDaysLeft(date))} days late</Text>
            </View>)
        }
        else if (date) {
            return (<View style={{ flexDirection: 'column', marginTop: 15, marginRight: 15, marginLeft: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    this.RBSheet.open()
                }}>
                    <Text style={{ color: colorsProvider.whiteColor, textDecorationLine: 'underline' }}>{Moment(date).format('DD/MM/YY')}</Text>
                </TouchableOpacity>
                <Text style={{ color: colorsProvider.whiteColor, textAlign: 'center', }}>{this.getNumberOfDaysLeft(date)} days {"\n"}till due</Text>
            </View>)
        }
        else {
            return <TouchableOpacity onPress={() => {
                this.RBSheet.open()
            }}>
                <Text style={{ color: colorsProvider.whiteColor, textAlign: 'center', marginTop: 15, marginRight: 15, marginLeft: 10, textDecorationLine: 'underline' }}>No due {"\n"}date set</Text>
            </TouchableOpacity>
        }

    }


    renderBottomSlidingPane() {
        return (<RBSheet
            ref={ref => {
                this.RBSheet = ref;
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
                flexDirection: 'column-reverse',
                justifyContent: 'space-around'
            }}>
                <Text style={{
                    fontFamily: colorsProvider.font,
                    color: colorsProvider.topBarColor,
                    fontSize: colorsProvider.fontSizeMain
                }}>Due Date</Text>
                <Text>{this.state.dueDate}</Text>
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
                            this.setState({ dueDate: date.toString()})
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
                {/* <View style={{
                    flex: 1,
                    flexDirection: 'row',
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
                </View> */}
            </View>
        </RBSheet>)
    }

    getNumberOfDaysLeft(date) {
        if (date)
            return (Moment(new Date(date)).diff({ todayDate }, 'days'))
    }

    renderImportance(importance) {
        if (this.props.hasImportance)
            return (<ImportanceRadio
                importance={importance}
                setImportanceNN={this.props.setImportanceNN}
                setImportanceNU={this.props.setImportanceNU}
                setImportanceIN={this.props.setImportanceIN}
                setImportanceIU={this.props.setImportanceIU} />
            )
    }

    renderParent(parent) {
        if (this.props.hasParent) {
            return <ParentSelection
                parentName={parent}
                parent={this.state.parent}
                selectParent={this.props.selectParent}
                allParents={this.props.allParents}
                addParent={(id, name) => {
                    this.props.setParent(id, name)
                    this.setState({ parent: id, parentName: name })
                }}
                removeParent={() => {
                    this.props.setParent(null, null)
                    this.setState({ parent: null, parentName: null })
                }}
            />
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flexDirection: 'column', marginBottom: 10, backgroundColor: colorsProvider.topBarColor }}>
                    {this.renderBottomSlidingPane()}

                    <View style={{ marginTop: '10%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: "1%" }}>
                        <TouchableOpacity
                            onPress={() => { this.props.closeModal() }}
                            style={{ margin: 5 }}>
                            <SIcon name={colorsProvider.backIcon} size={30} color={colorsProvider.whiteColor} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.nameTextInput.focus(); }}
                            style={{ width: '60%', marginBottom: 10, }}>
                            <TextInput
                                ref={(input) => { this.nameTextInput = input; }}
                                maxLength={40}
                                numberOfLines={2}
                                placeholder={"Name"}
                                onSubmitEditing={Keyboard.dismiss}
                                style={{
                                    color: colorsProvider.whiteColor,
                                    fontFamily: colorsProvider.font,
                                    fontSize: colorsProvider.fontSizeMain,
                                    borderBottomColor: colorsProvider.whiteColor,
                                    borderBottomWidth: 1
                                }}
                                multiline={true}
                                value={this.props.nameOfItem}
                                onChangeText={this.props.editName}>
                            </TextInput>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column' }}>
                            {this.getDueDate(this.props.dueDate)}
                        </View>
                    </View>
                    {this.renderParent(this.props.parentName)}
                    {this.renderImportance(this.state.importanceValue)}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}