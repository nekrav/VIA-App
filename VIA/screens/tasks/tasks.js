import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { CheckBox } from 'react-native-elements'
import { Text, View, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Database, Tasks } from '../../db'
import { CreateTask, ViewTask } from '../../modals'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import ActionButton from 'react-native-action-button';
import { ListTopBar } from '../../components'

import NotifService from '../../notifier/newNotifier';

const styles = require('./styles');

var uuid = require('react-native-uuid');

const controller = new Controller;

const dbTableName = Tasks.TABLE_NAME

export class TasksScreen extends React.Component {
    constructor(props) {
        super(props);
        global.notifier = new NotifService(
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

    componentDidMount() {
        const { navigation } = this.props;

        this.focusListener = navigation.addListener('didFocus', () => {
            controller.loadAll(this, dbTableName)
            this.setState({ count: 0 });
        });

        controller.loadAll(this, dbTableName)
        global.notifier.scheduleAllNotifications()
    }

    onRegister(token) {
        this.setState({registerToken: token.token, fcmRegistered: true});
      }
    
      onNotif(notif) {
        //Alert.alert(notif.title, notif.message);
      }
    
      handlePerm(perms) {
        //Alert.alert('Permissions', JSON.stringify(perms));
      }

    componentWillUnmount() {
        this.focusListener.remove();
        clearTimeout(this.t);
    }

    saveNew(task) {
        let newTask = {}
        newTask.id = uuid.v4();
        newTask.name = task.name;
        newTask.created_date = global.todayDate.toString();
        newTask.due_date = task.due_date ? task.due_date : "";
        newTask.importance = task.importance ? task.importance : 0;
        newTask.percentage_done = 0;
        newTask.completed = "false";
        newTask.project = task.project ? task.project : "";
        newTask.projectName = task.projectName ? task.projectName : "";
        newTask.time_spent = 0;
        newTask.notes = task.notes ? task.notes : "";
        newTask.notification_time = task.notification_time ? task.notification_time : ''
        Database.save(dbTableName, newTask).then(() => {
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, dbTableName)
            global.notifier.scheduleAllNotifications()
        })
    }

    /* #region  Top Bar Region */
    renderTopBar() {
        return <ListTopBar
            typeOfItem={"Tasks"}
            numberOfItems={this.state.numberOfItems}
            numberOfCompletedItems={this.state.numberOfFinishedItems}
            color={colorsProvider.tasksMainColor}
            secondaryColor={colorsProvider.tasksComplimentaryColor}
            onAddPress={() => {
                controller.setAddModalVisible(this, true);
            }}
        />
    }
    /* #endregion */

    showAddModal() {
        let newTask = {};
        if (this.state.addModalVisible) {
            return <CreateTask
                animationType="slide"
                transparent={false}
                name={(text) => { newTask.name = text }}
                due_date={(text) => {
                    newTask.due_date = text
                }}
                setImportanceNN={(text) => {
                    newTask.importance = 1;
                }}
                setImportanceNU={(text) => {
                    newTask.importance = 2;
                }}
                setImportanceIN={(text) => {
                    newTask.importance = 3;
                }}
                setImportanceIU={(text) => {
                    newTask.importance = 4;
                }}
                importance={(text) => { newTask.importance = text }}
                project={(id, name) => {
                    newTask.projectName = name;
                    newTask.project = id
                }}
                time_spent={(text) => { newTask.time_spent = text }}
                notes={(text) => { newTask.notes = text }}
                notification_time={(times) => {
                    if (times) {
                        newTask.notification_time = times
                    } else {
                        newTask.notification_time = JSON.stringify(global.emptyTimes)
                    }
                }}
                closeModal={() => { controller.setAddModalVisible(this, false) }}
                save={() => {
                    if (!newTask.notification_time) {
                        newTask.notification_time = global.emptyTimes
                        // newTask.notification_time = global.emptyTimes
                    }
                    this.saveNew(newTask)
                }}
            ></CreateTask>
        }
    }

    showViewTask() {
        if (this.state.viewModalVisible) {
            if (this.state.selectedItem != {}) {
                theTask = this.state.selectedItem
                return <ViewTask
                    animationType="slide"
                    visible={this.state.viewModalVisible}
                    transparent={false}
                    editName={(text) => {
                        theTask.name = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editDueDate={(text) => {
                        theTask.due_date = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    setImportanceNN={(text) => {
                        theTask.importance = 1;
                        this.setState({ selectedTask: theTask })
                    }}
                    setImportanceNU={(text) => {
                        theTask.importance = 2;
                        this.setState({ selectedTask: theTask })
                    }}
                    setImportanceIN={(text) => {
                        theTask.importance = 3;
                        this.setState({ selectedTask: theTask })
                    }}
                    setImportanceIU={(text) => {
                        theTask.importance = 4;
                        this.setState({ selectedTask: theTask })
                    }}
                    editPercentageDone={(text) => {
                        theTask.percentage_done = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editCompleted={(text) => {
                        theTask.completed = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editFinishedDate={(text) => {
                        theTask.finished_date = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editProject={(text, name) => {
                        theTask.projectName = name
                        theTask.project = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editTimeSpent={(text) => {
                        theTask.time_spent = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editNotes={(text) => {
                        theTask.notes = text;
                        this.setState({ selectedTask: theTask })
                    }}
                    editNotificationTime={(text) => {
                        if (text) {
                            theTask.notification_time = text
                            this.setState({ selectedTask: theTask })
                        }
                    }}

                    save={() => {
                        controller.saveExisting(this, dbTableName, theTask)
                    }}

                    selectedItem={theTask}

                    delete={() => { controller.delete(this, dbTableName, theTask) }}

                    closeModal={() => { controller.setViewModalVisible(this, false) }}>
                </ViewTask>
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
                    {this.showViewTask()}

                    {/* /* #region Top Navigation Section  */}
                    {/* <View style={styles.topNav}>
                        <View style={styles.centerTitleContainer}><Text style={styles.topNavLeftTitleText}>Tasks</Text></View>
                        <Text style={styles.topNavCenterTitleText}>{this.state.numberOfItems}</Text>
                        <TouchableOpacity style={styles.addItemButtonContainer}
                            onPress={() => {
                                controller.setAddModalVisible(this, true);
                            }}>
                            <FIcon style={styles.addItemButtonText} name="plus" />
                        </TouchableOpacity>
                    </View> */}

                    {this.renderTopBar()}

                    {/* List Region */}
                    <FlatList
                        data={this.state.items}
                        renderItem={({ item }) =>
                            <TouchableWithoutFeedback onPress={() => { }}>
                                <TouchableOpacity onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }} style={item.value.completed == 'true' ? styles.listItemContainerFinished : styles.listItemContainer}>
                                    <View style={styles.checkboxAndNameContainer}>
                                        <CheckBox
                                            center
                                            checkedIcon={colorsProvider.checkboxIcon}
                                            uncheckedIcon={colorsProvider.checkboxIcon}
                                            checkedColor={colorsProvider.finishedBackgroundColor}
                                            uncheckedColor={colorsProvider.tasksComplimentaryColor}
                                            containerStyle={colorsProvider.checkboxContainerStyle}
                                            size={colorsProvider.checkboxIconSize}
                                            onPress={() => {
                                                item.value.completed = !this.getChecked(item)
                                                if (item.value.completed == true) {
                                                    item.value.finished_date = new Date(Date.now())
                                                    item.value.percentage_done = 10
                                                } else {
                                                    item.value.finished_date == ""
                                                    item.value.percentage_done = 0
                                                }
                                                controller.saveExisting(this, dbTableName, item.value)
                                            }}
                                            checked={this.getChecked(item)}
                                        />
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
                                        <TouchableOpacity
                                            style={{
                                                color: colorsProvider.whiteColor,
                                                fontFamily: colorsProvider.font,
                                                fontSize: colorsProvider.fontSizeChildren,
                                            }}
                                            onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                                            <SIcon style={styles.listItemActionButton} name="arrow-right" size={30} color={colorsProvider.whiteColor} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity></TouchableWithoutFeedback>} />
                    <ActionButton
                        size={65}
                        hideShadow={false}
                        offsetY={10}
                        offsetX={10}
                        buttonColor={colorsProvider.tasksMainColor}
                        onPress={() => {
                            controller.setAddModalVisible(this, true);
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}