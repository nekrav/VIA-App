import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput } from 'react-native';
import { Database, Habits } from '../../db'
import { CreateHabit, ViewHabit } from '../../modals'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import { Notifier } from '../../notifier/notifier'

const notifier = new Notifier;


const styles = require('./styles');

var uuid = require('react-native-uuid');

const controller = new Controller;

const dbTableName = Habits.TABLE_NAME

export class HabitsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            viewModalVisible: false,
            items: [],
            numberOfItems: 0,
            numberOfFinishedItems: 0,
            selectedItem: {}
        };
    }

    componentDidMount() {
        controller.loadAll(this, dbTableName)
        notifier.scheduleAllNotifications() 
    }

    saveNew(habit) {
        let newHabit = {}
        newHabit.id = habit.id;
        newHabit.name = habit.name;
        newHabit.created_date = new Date().getDate();
        newHabit.start_time = habit.start_time ? habit.start_time : ''
        newHabit.end_time = habit.end_time ? habit.end_time : ''
        newHabit.importance = habit.importance ? habit.importance : ''
        newHabit.percentage_done = 0
        newHabit.routine = habit.routine ? habit.routine : '';
        newHabit.completed = "false"
        newHabit.time_to_spend = habit.time_to_spend ? habit.time_to_spend : ''
        newHabit.notification_time = habit.notification_time ? habit.notification_time : ''
        newHabit.days_to_do = habit.days_to_do ? habit.days_to_do : ''

        Database.save(dbTableName, newHabit).then(() => {
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, dbTableName)
            notifier.scheduleAllNotifications() 
        })
    }

    showAddModal() {
        let newHabit = {};
        if (this.state.addModalVisible) {
            return <CreateHabit
                animationType="slide"
                transparent={false}
                id={(text) => { newHabit.id = text }}
                name={(text) => { newHabit.name = text }}
                importance={(text) => { newHabit.importance = text }}
                time_to_spend={(text) => { newHabit.time_to_spend = text }}
                start_time={(text) => { newHabit.start_time = text }}
                end_time={(text) => { newHabit.end_time = text }}
                notification_time={(text) => { 
                    if (text) {
                        var times = text.map(function (time) {
                            return JSON.stringify(time)
                        })
                        newHabit.notification_time = times
                    }
                }}
                routine={(text) => { newHabit.routine = text }}
                days_to_do={(text) => { newHabit.days_to_do = text }}
                closeModal={() => { controller.setAddModalVisible(this, false) }}
                save={() => { this.saveNew(newHabit) }}
            ></CreateHabit>
        }
    }

    showViewHabit() {
        if (this.state.viewModalVisible) {
            if (this.state.selectedItem != {}) {
                theHabit = this.state.selectedItem
                return <ViewHabit
                    animationType="slide"
                    transparent={false}
                    editName={(text) => {
                        theHabit.name = text;
                        this.setState({ selectedItem: theHabit })
                    }}
                    editStartTime={(text) => {
                        theHabit.start_time = text;
                        this.setState({ selectedItem: theHabit })
                    }}
                    editEndTime={(text) => {
                        theHabit.end_time = text;
                        this.setState({ selectedItem: theHabit })
                    }}
                    editImportance={(text) => {
                        theHabit.importance = text;
                        this.setState({ selectedItem: theHabit })
                    }}
                    editPercentageDone={(text) => {
                        theHabit.percentage_done = text;
                        this.setState({ selectedItem: theHabit })
                    }}
                    editCompleted={(text) => {
                        theHabit.completed = text;
                        this.setState({ selectedItem: theHabit })
                    }}
                    editFinishedDate={(text) => {
                        theHabit.finished_date = text;
                        this.setState({ selectedItem: theHabit })
                    }}
                    editTimeToSpend={(text) => {
                        theHabit.time_to_spend = text;
                        this.setState({ selectedItem: theHabit })
                    }}
                    editNotificationTime={(text) => {
                        var times = text.map(function (time) {
                            return JSON.stringify(time)
                        })
                        theHabit.notification_time = times
                        this.setState({ selectedTask: theHabit })
                    }}
                    editRoutine={(text) => {
                        theHabit.routine = text;
                        this.setState({ selectedItem: theHabit })
                    }}
                    editDaysToDo={(text) => {
                        theHabit.days_to_do = text;
                        this.setState({ selectedItem: theHabit })
                    }}

                    save={() => { controller.saveExisting(this, dbTableName, theHabit) }}

                    selectedItem={theHabit}

                    delete={() => { controller.delete(this, dbTableName, theHabit) }}

                    closeModal={() => { controller.setViewModalVisible(this, false) }}>
                </ViewHabit>
            }
        }
    }

    getChecked(item) {
        if (item != null)
            var checked = false
        return checked = item.value.completed === "true"
    }
    

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.outerView}>

                    {/* Modals Region */}
                    {this.showAddModal()}
                    {this.showViewHabit()}

                    {/* /* #region Top Navigation Section  */}
                    <View style={styles.topNav}>
                        <View style={styles.centerTitleContainer}><Text style={styles.topNavLeftTitleText}>Habits</Text></View>
                        <Text style={styles.topNavCenterTitleText}>{this.state.numberOfItems}</Text>
                        <TouchableOpacity style={styles.addItemButtonContainer}
                            onPress={() => {
                                controller.setAddModalVisible(this, true);
                            }}>
                            <FIcon style={styles.addItemButtonText} name="plus" />
                        </TouchableOpacity>
                    </View>

                    {/* List Region */}
                    <FlatList
                        data={this.state.items}
                        renderItem={({ item }) =>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <TouchableOpacity onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }} style={item.value.completed == 'true' ? styles.listItemContainer : styles.listItemContainer}>

                                <View style={styles.checkboxAndNameContainer}>
                                    <CheckBox
                                        center
                                        checkedIcon={colorsProvider.checkboxIcon}
                                        uncheckedIcon={colorsProvider.checkboxIcon}
                                        checkedColor={colorsProvider.finishedBackgroundColor}
                                        uncheckedColor={colorsProvider.habitsComplimentaryColor}
                                        containerStyle={colorsProvider.checkboxContainerStyle}
                                        size={colorsProvider.checkboxIconSize}
                                        onPress={() => {
                                            item.value.completed = !this.getChecked(item)
                                            controller.saveExisting(this, dbTableName, item.value)
                                        }}
                                        checked={this.getChecked(item)} />
                                    <View style={styles.listItemTextContainer}>
                                        <Text
                                            numberOfLines={1}
                                            multiline={false}
                                            style={styles.listItemText}>{item.value.name} </Text></View>
                                </View>
                                <View style={styles.listItemActionButtonsContainer}>
                                    {/* <TouchableOpacity
                                        style={styles.listItemActionButton}
                                        onPress={() => { controller.delete(this, dbTableName, item.value); notifier.scheduleAllNotifications()}}>
                                        <SIcon style={styles.listItemActionButton} name="trash" size={30} color={colorsProvider.habitsComplimentaryColor} />
                                    </TouchableOpacity> */}

                                    {/* <TouchableOpacity
                                    style={styles.listItemActionButton}
                                    onPress={() => {
                                        controller.silenceAlarms(this, dbTableName, item.value)
                                    }}>
                                    <SIcon style={styles.listItemActionButton} name="bell" size={30} color={colorsProvider.shadowColor} />
                                </TouchableOpacity> */}

                                    <TouchableOpacity
                                        style={styles.listItemActionButton}
                                        onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                                        <SIcon style={styles.listItemActionButton} name="arrow-right" size={colorsProvider.checkboxIconSize} color={colorsProvider.habitsComplimentaryColor} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity></TouchableWithoutFeedback>} />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}