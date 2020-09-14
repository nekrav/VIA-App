import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { Text, View, TouchableOpacity, Modal, FlatList, SafeAreaView } from 'react-native'; // Version can be specified in package.json
import Moment from 'moment'
import { CheckBox } from 'react-native-elements'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { DateModal } from '../dateModal/dateModal'
import NotifService from '../../notifier/newNotifier';
import DatePicker from 'react-native-date-picker'

const styles = require('../notificationTimes/styles');

var hours = new Date().getHours(); //Current Hours
var min = new Date().getMinutes(); //Current Minutes
var sec = new Date().getSeconds(); //Current Seconds

const timeFormat = "hh:mm A"

const currentTime = hours + ":" + min




export class NotifTimeModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dayOfTheWeek: this.props.dayOfTheWeek,
            notificationTimes: '',
            visible: this.props.visible,
        };
    }

    setDate = (event, date) => {
        this.props.setDate(date)
    }

    addNotificationTime(hour) {
        var newTimesArray = this.state.mondayNotificationTimes.concat(hour)
        this.setState({ mondayNotificationTimes: newTimesArray })
    }

    toggleNotificationTimeSelectionModal(visibility) {
        this.setState({ notificationTimeSelectionModalVisibility: visibility })
    }

    renderDaysOfWeekTimeSelection() {
        const arr = this.state.times
        return (

            <FlatList
                data={arr}
                renderItem={(day) =>
                    <View style={[styles.weekdayNotificationContainer]}>
                        {this.renderShowNotificationTimeSelection(arr)}
                        <View style={styles.weekdayNotificationButtonsContainer}>
                            <CheckBox
                                center
                                key={day.item.key.toString()}
                                checkedIcon={colorsProvider.checkboxIcon}
                                uncheckedIcon={colorsProvider.checkboxIcon}
                                checkedColor={this.props.saveButtonBackgroundColor}
                                // uncheckedColor={colorsProvider.habitsComplimentaryColor}
                                checked={day.item.checked}
                                textStyle={styles.checkboxText}
                                containerStyle={styles.weekSelectionContainer}
                                onPress={() => {
                                    day.item.checked = !day.item.checked
                                    this.setState({ times: arr })
                                }}
                            />
                            <View style={styles.weekSelectionTextContainer}><Text style={styles.checkboxText}> {day.item.name}</Text></View>
                            <TouchableOpacity style={styles.addTimeButtonContainer}
                                onPress={() => {
                                    this.setState({ selectedDayToAddTimeTo: day.item.key }, () => {
                                        this.toggleNotificationTimeSelectionModal(true)
                                    })
                                }}>
                                <View style={styles.addTimeButtonContainerView}>
                                    <SIcon style={{ marginLeft: 10, }} name="plus" size={16} color={colorsProvider.shadowColor} />
                                    <Text style={styles.addTimeButtonText}> Add Time</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={day.item.times}
                            contentContainerStyle={{ marginLeft: 10, marginRight: 10, alignContent: 'center' }}
                            style={{ marginLeft: 10, marginRight: 10 }}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={styles.weekdayNotificationTimeContainer}
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
                                    <View style={[styles.weekdayNotificationTimeContainerView, { backgroundColor: this.props.saveButtonBackgroundColor }]}>
                                        <Text style={styles.weekdayNotificationTimeText}>{item}</Text>
                                        <SIcon style={{ marginLeft: 10, }} name="minus" size={16} color={colorsProvider.whiteColor} />
                                    </View>
                                </TouchableOpacity>} />
                    </View>
                } />
        )
    }

    // renderShowNotificationTimeSelection(arr) {
    //     if (this.state.notificationTimeSelectionModalVisibility) {
    //         return <DateModal
    //             pickerMode="time"
    //             animationType="fade"
    //             saveButtonBackgroundColor={this.props.saveButtonBackgroundColor}
    //             disabledSaveButtonBackgroundColor={this.props.disabledSaveButtonBackgroundColor}
    //             saveButtonTextColor={this.props.saveButtonTextColor}
    //             disabledSaveButtonTextColor={this.props.disabledSaveButtonTextColor}
    //             transparent={true}
    //             fromNotificationTimesModal={true}
    //             onSubmit={(item) => {
    //                 selectedDay = arr.find(theDay => theDay.key === this.state.selectedDayToAddTimeTo)
    //                 selectedDay.checked = true
    //                 newArray = selectedDay.times.concat(Moment(new Date(item)).format(timeFormat))
    //                 selectedDay.times = newArray
    //                 this.setState({ times: arr });
    //             }}
    //             setDate={(item) => { }}
    //             closeModal={() => { this.toggleNotificationTimeSelectionModal(false) }}>
    //         </DateModal>
    //     }
    //     return null;
    // }


    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <View style={{
                    // marginTop: '100%',
                    // height: '50%',
                    flexDirection: 'column', backgroundColor: 'rgba(26, 26, 26, 0.9)'
                }}>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <TouchableOpacity
                            style={{ marginRight: 10, marginTop: 100, }}
                            onPress={this.props.closeModal}>
                            <SIcon name={colorsProvider.close} style={{}} size={40} color={colorsProvider.incompleteColor} />
                        </TouchableOpacity>
                    </View>
                    <FlatList />
                    <View style={{ alignItems: 'center', backgroundColor: colorsProvider.topBarColor }}>
                        <View style={{ alignItems: 'center', marginBottom: 20, }}>
                            <DatePicker
                                textColor={colorsProvider.whiteColor}
                                mode="time"
                            // date={date}
                            // onDateChange={setDate}
                            /></View>
                    </View>
                </View>
            </Modal>
        );
    }
}