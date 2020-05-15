import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { CheckBox, colors } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput } from 'react-native';
import { Database, Projects, Tasks } from '../../db'
import { CreateProject, ViewProject, ViewTask, ViewTaskFromProject } from '../../modals'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import { Notifier } from '../../notifier/notifier'

const notifier = new Notifier;

const styles = require('./styles');

var uuid = require('react-native-uuid');

const controller = new Controller;

const dbTableName = Projects.TABLE_NAME


const childTableName = Tasks.TABLE_NAME

export class ProjectsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            viewModalVisible: false,
            items: [],
            numberOfItems: 0,
            numberOfFinishedItems: 0,
            selectedItem: {},
            selectedChildItem: '',
            childOfListItemModalVisible: false,
        };
    }

    componentDidMount() {
        notifier.scheduleAllNotifications()
        this.props.navigation.addListener('willFocus', (payload) => {
            controller.loadAll(this, dbTableName)
        });
        controller.loadAll(this, dbTableName)
    }

    saveNew(project) {
        let newProject = {}
        newProject.id = project.id;
        newProject.name = project.name;
        newProject.created_date = new Date().getDate();
        newProject.due_date = project.due_date ? project.due_date : "";
        newProject.importance = project.importance ? project.importance : 0;
        newProject.percentage_done = 0;
        newProject.completed = "false";
        newProject.notification_time = project.notification_time ? project.notification_time : ''
        newProject.time_spent = 0;
        newProject.notes = project.notes ? project.notes : "";

        Database.save(dbTableName, newProject).then(() => {
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, dbTableName)
            notifier.scheduleAllNotifications()
        })
    }

    showAddModal() {
        let newProject = {};
        if (this.state.addModalVisible) {
            return <CreateProject
                animationType="slide"
                transparent={false}
                id={(text) => { newProject.id = text }}
                name={(text) => { newProject.name = text }}
                due_date={(text) => { newProject.due_date = text }}
                importance={(text) => { newProject.importance = text }}
                time_spent={(text) => { newProject.time_spent = text }}
                notes={(text) => { newProject.notes = text }}
                notification_time={(text) => {
                    if (text) {
                        var times = text.map(function (time) {
                            return JSON.stringify(time)
                        })
                        newProject.notification_time = times
                    }
                }}
                closeModal={() => { controller.setAddModalVisible(this, false) }}
                save={() => { this.saveNew(newProject) }}
            ></CreateProject>
        }
    }

    showViewProject() {
        if (this.state.viewModalVisible) {
            if (this.state.selectedItem != {}) {
                theProject = this.state.selectedItem
                return <ViewProject
                    animationType="slide"
                    visible={this.state.viewModalVisible}
                    transparent={false}
                    editName={(text) => {
                        theProject.name = text;
                        this.setState({ selectedProject: theProject })
                    }}
                    editDueDate={(text) => {
                        theProject.due_date = text;
                        this.setState({ selectedProject: theProject })
                    }}
                    editImportance={(text) => {
                        theProject.importance = text;
                        this.setState({ selectedProject: theProject })
                    }}
                    editCompleted={(text) => {
                        theProject.completed = text;
                        this.setState({ selectedProject: theProject })
                    }}
                    editFinishedDate={(text) => {
                        theProject.finished_date = text;
                        this.setState({ selectedProject: theProject })
                    }}
                    editTimeSpent={(text) => {
                        theProject.time_spent = text;
                        this.setState({ selectedProject: theProject })
                    }}
                    editPercentageDone={(text) => {
                        theProject.percentage_done = text;
                        this.setState({ selectedProject: theProject })
                    }}
                    editNotes={(text) => {
                        theProject.notes = text;
                        this.setState({ selectedProject: theProject })
                    }}
                    editNotificationTime={(text) => {
                        if (text) {
                            var times = text.map(function (time) {
                                return JSON.stringify(time)
                            })
                            theProject.notification_time = times
                            this.setState({ selectedProject: theProject })
                        }
                    }}

                    goToChildItem={(passedChildItem) => {
                        this.setState({ selectedChildItem: passedChildItem, childOfListItemModalVisible: true })
                    }}

                    save={() => { controller.saveExisting(this, dbTableName, theProject) }}

                    selectedItem={theProject}

                    delete={() => { controller.delete(this, dbTableName, theProject) }}

                    closeModal={() => { controller.setViewModalVisible(this, false) }}>
                </ViewProject>
            }
        }
    }

    renderChildItemModal() {
        if (this.state.childOfListItemModalVisible) {
            if (this.state.selectedChildItem != '') {
                theTask = this.state.selectedChildItem
                return <ViewTaskFromProject
                    animationType="slide"
                    transparent={false}
                    theChildItem={theTask}
                    visible={this.state.childOfListItemModalVisible}
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

                    save={() => { controller.saveExisting(this, childTableName, theTask) }}

                    delete={() => {
                        // controller.delete(this, childTableName, theTask)
                        controller.loadAllChildrenAndGetRelatedChildren(this, Tasks.TABLE_NAME, selectedChildItem, "project")
                        // this.setCreateTaskModalVisibility(false)
                        this.setState({ childOfListItemModalVisible: false })
                    }}

                    closeModal={() => {
                        this.setState({ childOfListItemModalVisible: false})
                        controller.setViewModalVisible(this, true)
                    }}>
                </ViewTaskFromProject>
            }
        }
    }

    getChecked(item) {
        if (item != null)
        // var checked = false
        {
            return checked = item.value.completed === "true"
        }

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.outerView}>
                    {/* Modals Region */}
                    {this.showAddModal()}
                    {this.showViewProject()}
                    {this.renderChildItemModal()}

                    {/* /* #region Top Navigation Section  */}
                    <View style={styles.topNav}>
                        <View style={styles.centerTitleContainer}><Text style={styles.topNavLeftTitleText}>Projects</Text></View>
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
                            <TouchableWithoutFeedback onPress={() => { }}>
                                <TouchableOpacity onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }} style={item.value.completed == 'true' ? styles.listItemContainerFinished : styles.listItemContainer}>
                                    <View style={styles.checkboxAndNameContainer}>
                                        <CheckBox
                                            center
                                            checkedIcon={colorsProvider.checkboxIcon}
                                            uncheckedIcon={colorsProvider.checkboxIcon}
                                            checkedColor={colorsProvider.finishedBackgroundColor}
                                            uncheckedColor={colorsProvider.projectsComplimentaryColor}
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
                                            onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                                            <SIcon style={styles.listItemActionButton} name="arrow-right" size={30} color={colorsProvider.shadowColor} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity></TouchableWithoutFeedback>} />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}