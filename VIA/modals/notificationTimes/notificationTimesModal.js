import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput, FlatList, SafeAreaView } from 'react-native'; // Version can be specified in package.json
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment'
import { TabView, SceneMap } from 'react-native-tab-view';
import { CheckBox } from 'react-native-elements'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { DateModal } from '../dateModal/dateModal'


const styles = require('./styles');

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth(); //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = new Date().getHours(); //Current Hours
var min = new Date().getMinutes(); //Current Minutes
var sec = new Date().getSeconds(); //Current Seconds

const timeFormat = 'hh:mm'

const currentTime = hours + ":" + min


export class NotificationTimesModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mondayChecked: false,
            mondayNotificationTimes: [],
            notificationTimeSelectionModalVisibility: false,
            selectedDayToAddTimeTo: '',
            times: [
                {
                    key: 'Monday',
                    checked: false,
                    times: []
                },
                {
                    key: 'Tuesday',
                    checked: false,
                    times: []
                },
                {
                    key: 'Wednesday',
                    checked: false,
                    times: []
                },
                {
                    key: 'Thursday',
                    checked: false,
                    times: []
                },
                {
                    key: 'Friday',
                    checked: false,
                    times: []
                },
                {
                    key: 'Saturday',
                    checked: false,
                    times: []
                },
                {
                    key: 'Sunday',
                    checked: false,
                    times: []
                },
            ]

        };
    }

    setDate = (event, date) => {
        this.props.setDate(JSON.stringify(date))
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
                    <View style={styles.weekdayNotificationContainer}>
                        {this.renderShowNotificationTimeSelection(arr)}
                        <View style={styles.weekdayNotificationButtonsContainer}>
                            <CheckBox
                                center
                                key={day.item.key}
                                title={day.item.key}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={day.item.checked}
                                textStyle={styles.checkboxText}
                                containerStyle={styles.weekSelectionContainer}
                                onPress={() => {
                                    day.item.checked = !day.item.checked
                                    this.setState({ times: arr })
                                }}
                            />
                            <TouchableOpacity style={styles.addTimeButtonContainer}
                                onPress={() => {
                                    this.setState({ selectedDayToAddTimeTo: day.item.key }, () => {
                                        this.toggleNotificationTimeSelectionModal(true)
                                    })
                                }}>
                                <View style={styles.addTimeButtonContainerView}>
                                    <SIcon style={{ marginLeft: 10, }} name="plus" size={16} color="#000" />
                                    <Text style={styles.addTimeButtonText}> Add Time</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                            <FlatList
                                horizontal={true}
                                data={day.item.times}
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
                                        <View style={styles.weekdayNotificationTimeContainerView}>
                                            <Text style={styles.weekdayNotificationTimeText}>{item}</Text>
                                            <SIcon style={{ marginLeft: 10, }} name="minus" size={16} color="#ffffff" />
                                        </View>
                                    </TouchableOpacity>} />
                    </View>
                } />
        )
    }

    renderShowNotificationTimeSelection(arr) {
        if (this.state.notificationTimeSelectionModalVisibility) {
            return <DateModal
                pickerMode="time"
                animationType="fade"
                transparent={true}
                onSubmit={(item) => {
                    selectedDay = arr.find(theDay => theDay.key === this.state.selectedDayToAddTimeTo)
                    newArray = selectedDay.times.concat(Moment(new Date(item)).format(timeFormat))
                    selectedDay.times = newArray
                    this.setState({ times: arr });
                }}
                setDate={(item) => { }}
                closeModal={() => { this.toggleNotificationTimeSelectionModal(false) }}>
            </DateModal>
        }
        return null;
    }


    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>

                <SafeAreaView style={styles.outerView}>
                    {this.renderDaysOfWeekTimeSelection()}
                    <TouchableOpacity style={styles.bottomButtonContainer}
                        onPress={() => {
                            this.setDate(null, this.state.times)
                            this.props.closeModal()
                        }}>
                        <Text style={styles.bottomButtonText}>Close</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        );
    }
}