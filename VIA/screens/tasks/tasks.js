import React from 'react';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput } from 'react-native';
import { Database, Projects, Tasks } from '../../db'
import { CreateTask, ViewTask } from '../../modals'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';


const styles = require('./styles');

var uuid = require('react-native-uuid');

const controller = new Controller;

const dbTableName = Tasks.TABLE_NAME

export class TasksScreen extends React.Component {
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
        StatusBar.setBackgroundColor = "#000"

        controller.loadAll(this, dbTableName)
    }

    saveNew(task) {
        let newTask = {}
        newTask.id = uuid.v4();
        newTask.name = task.name;
        newTask.created_date = new Date().getDate();
        newTask.due_date = task.due_date ? task.due_date : "";
        newTask.importance = task.importance ? task.importance : 0;
        newTask.percentage_done = 0;
        newTask.completed = "false";
        newTask.project = task.project ? task.project : "";
        newTask.time_spent = 0;
        newTask.notes = task.notes ? task.notes : "";
        newTask.notification_time = task.notification_time ? task.notification_time : ''
        Database.save(dbTableName, newTask).then(() => {
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, dbTableName)
        })
    }

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
                importance={(text) => { newTask.importance = text }}
                project={(text) => { newTask.project = text }}
                time_spent={(text) => { newTask.time_spent = text }}
                notes={(text) => { newTask.notes = text }}
                notification_time={(text) => {
                    if (text) {
                        var times = text.map(function (time) {
                            return JSON.stringify(time)
                        })
                        newTask.notification_time = times 
                    }
                }}
                closeModal={() => { controller.setAddModalVisible(this, false) }}
                save={() => {
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
                    editImportance={(text) => {
                        theTask.importance = text;
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
                    editProject={(text) => {
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
                            var times = text.map(function (time) {
                                return JSON.stringify(time)
                            })
                            theTask.notification_time = times
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
                <SafeAreaView style={styles.outerView}>

                    {/* Modals Region */}
                    {this.showAddModal()}
                    {this.showViewTask()}

                    {/* /* #region Top Navigation Section  */}
                    <View style={styles.topNav}>
                        <View style={styles.centerTitleContainer}><Text style={styles.topNavLeftTitleText}>Tasks</Text></View>
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
                            <View style={item.value.completed == 'true' ? styles.listItemContainerFinished : styles.listItemContainer}>
                                <View style={styles.checkboxAndNameContainer}>
                                    <CheckBox
                                        containerStyle={styles.checkBox}
                                        center
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        size={35}
                                        onPress={() => {
                                            item.value.completed = !this.getChecked(item)
                                            controller.saveExisting(this, dbTableName, item.value)
                                        }}
                                        checked={this.getChecked(item)}
                                    />
                                    <View style={styles.listItemTextContainer}>
                                        <Text
                                            numberOfLines={1}
                                            multiline={false}
                                            style={styles.listItemText}>{item.value.name} </Text></View>
                                </View>



                                <View style={styles.listItemActionButtonsContainer}>
                                    <TouchableOpacity
                                        style={styles.listItemActionButton}
                                        onPress={() => { controller.delete(this, dbTableName, item.value) }}
                                    >
                                        <SIcon style={styles.listItemActionButton} name="trash" size={30} color="#f00" />
                                    </TouchableOpacity>

                                    {/* <TouchableOpacity
                                        style={styles.listItemActionButton}
                                        onPress={() => {
                                            controller.silenceAlarms(this, dbTableName, item.value)
                                        }}>
                                        <SIcon style={styles.listItemActionButton} name="bell" size={30} color="#000" />
                                    </TouchableOpacity> */}

                                    <TouchableOpacity
                                        style={styles.listItemActionButton}
                                        onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                                        <SIcon style={styles.listItemActionButton} name="arrow-right" size={30} color="#000" />
                                    </TouchableOpacity>
                                </View>

                            </View>} />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}