import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { CheckBox } from 'react-native-elements'

import { Text, View, Button, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput } from 'react-native';
import { Database, Habits } from '../../db'
import { CreateHabit, ViewHabit } from '../../modals'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import NotifService from '../../notifier/newNotifier';
import { ListTopBar } from '../../components'
import ActionButton from 'react-native-action-button';


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

const styles = require('./styles');

var uuid = require('react-native-uuid');

const controller = new Controller;

const dbTableName = Habits.TABLE_NAME

export class HabitsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
          );
        this.state = {
            addModalVisible: false,
            viewModalVisible: false,
            items: [],
            numberOfItems: 0,
            numberOfFinishedItems: 0,
            selectedItem: {}
        };
    }

    componentDidUpdate(prevProps) {
    }

    componentDidMount() {
        const { navigation } = this.props;

        this.focusListener = navigation.addListener('didFocus', () => {
            controller.loadAll(this, dbTableName)
            this.setState({ count: 0 });
        });
        controller.loadAll(this, dbTableName)
        this.notif.scheduleAllNotifications()
    }


    onRegister(token) {
        this.setState({registerToken: token.token, fcmRegistered: true});
      }
    
      onNotif(notif) {
        Alert.alert(notif.title, notif.message);
      }
    
      handlePerm(perms) {
        Alert.alert('Permissions', JSON.stringify(perms));
      }

    componentWillUnmount() {
        this.focusListener.remove();
        clearTimeout(this.t);
    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return <ListTopBar
            typeOfItem={"Habits"}
            numberOfItems={this.state.numberOfItems}
            numberOfCompletedItems={this.state.numberOfFinishedItems}
            color={colorsProvider.habitsMainColor}
            secondaryColor={colorsProvider.habitsComplimentaryColor}
            onAddPress={() => {
                controller.setAddModalVisible(this, true);
            }}
        />
    }
    /* #endregion */



    saveNew(habit) {
        let newHabit = {}
        newHabit.id = uuid.v4();
        newHabit.name = habit.name;
        newHabit.created_date = new Date().getDate();
        newHabit.start_time = habit.start_time ? habit.start_time : ''
        newHabit.end_time = habit.end_time ? habit.end_time : ''
        newHabit.importance = habit.importance ? habit.importance : ''
        newHabit.percentage_done = 0
        newHabit.routine = habit.routine ? habit.routine : '';
        newHabit.routineName = habit.routineName ? habit.routineName : '';
        newHabit.completed = "false"
        newHabit.time_to_spend = habit.time_to_spend ? habit.time_to_spend : ''
        newHabit.notes = habit.notes ? habit.notes : '',
            newHabit.notification_time = habit.notification_time ? habit.notification_time : ''
        newHabit.days_to_do = habit.days_to_do ? habit.days_to_do : ''

        Database.save(dbTableName, newHabit).then(() => {
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, dbTableName)
            this.notif.scheduleAllNotifications()
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
                setImportanceNN={(text) => {
                    newHabit.importance = 1;
                }}
                setImportanceNU={(text) => {
                    newHabit.importance = 2;
                }}
                setImportanceIN={(text) => {
                    newHabit.importance = 3;
                }}
                setImportanceIU={(text) => {
                    newHabit.importance = 4;
                }}
                time_to_spend={(text) => { newHabit.time_to_spend = text }}
                start_time={(text) => { newHabit.start_time = text }}
                end_time={(text) => { newHabit.end_time = text }}
                notification_time={(times) => {
                    if (times) {
                        newHabit.notification_time = times
                    } else {
                        newHabit.notification_time = JSON.stringify(emptyTimes)
                    }
                }}
                routine={(text, name) => { newHabit.routine = text; newHabit.routineName = name }}
                days_to_do={(text) => { newHabit.days_to_do = text }}
                notes={(text) => { newHabit.notes = text }}
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
                    setImportanceNN={(text) => {
                        theHabit.importance = 1;
                    }}
                    setImportanceNU={(text) => {
                        theHabit.importance = 2;
                    }}
                    setImportanceIN={(text) => {
                        theHabit.importance = 3;
                    }}
                    setImportanceIU={(text) => {
                        theHabit.importance = 4;
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
                    editNotificationTime={(times) => {
                        if (times) {
                            theHabit.notification_time = times
                        } else {
                            theHabit.notification_time = JSON.stringify(emptyTimes)
                        }
                        this.setState({ selectedItem: theHabit })
                    }}
                    editNotes={(text) => {
                        theHabit.notes = text;
                        this.setState({ selectedItem: theHabit })
                    }}
                    editRoutine={(text, name) => {
                        theHabit.routineName = name;
                        theHabit.routine = text;
                        this.setState({ selectedItem: theHabit })
                    }}
                    editDaysToDo={(text) => {
                        theHabit.days_to_do = text;
                        this.setState({ selectedItem: theHabit })
                    }}

                    save={() => {
                        controller.saveExisting(this, dbTableName, theHabit)
                    }}

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
                <View style={styles.outerView}>

                    {/* Modals Region */}
                    {this.showAddModal()}
                    {this.showViewHabit()}

                    {this.renderTopBar()}

                    {/* List Region */}
                    <FlatList
                        data={this.state.items}
                        renderItem={({ item }) =>
                            <TouchableWithoutFeedback onPress={() => { }}>
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
                                                if (item.value.completed == true) {
                                                    item.value.finished_date = new Date(Date.now())
                                                } else {
                                                    item.value.finished_date == ""
                                                }
                                                controller.saveExisting(this, dbTableName, item.value)
                                            }}
                                            checked={this.getChecked(item)} />
                                        <View style={styles.listItemTextContainer}>
                                            <Text
                                                numberOfLines={1}
                                                multiline={false}
                                                style={{
                                                    color: colorsProvider.whiteColor,
                                                    fontFamily: colorsProvider.font,
                                                    fontSize: colorsProvider.fontSizeChildren,
                                                }}>{item.value.name} </Text></View>
                                    </View>
                                    <View style={styles.listItemActionButtonsContainer}>
                                        {/* <TouchableOpacity
                                        style={styles.listItemActionButton}
                                        onPress={() => { controller.delete(this, dbTableName, item.value); this.notif.scheduleAllNotifications()}}>
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
                                            <SIcon style={{
                                                color: colorsProvider.whiteColor,
                                                fontFamily: colorsProvider.font,
                                                fontSize: colorsProvider.fontSizeChildren,
                                            }} name="arrow-right" size={colorsProvider.checkboxIconSize} color={colorsProvider.habitsComplimentaryColor} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </TouchableWithoutFeedback>} />
                    <ActionButton
                        size={65}
                        hideShadow={false}
                        offsetY={10}
                        offsetX={10}
                        buttonColor={colorsProvider.habitsMainColor}
                        onPress={() => {
                            controller.setAddModalVisible(this, true);
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}