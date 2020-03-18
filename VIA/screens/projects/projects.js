import React from 'react';
import * as colorsProvider from '../../components/colorsProvider';
import { CheckBox, colors } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList, StatusBar, TouchableWithoutFeedback, SafeAreaView, Keyboard, TextInput } from 'react-native';
import { Database, Projects, Tasks } from '../../db'
import { CreateProject, ViewProject } from '../../modals'
import { Controller } from '../controller'
import SIcon from 'react-native-vector-icons/dist/SimpleLineIcons';
import FIcon from 'react-native-vector-icons/dist/Feather';
import { Notifier } from '../../notifier/notifier'

const notifier = new Notifier;


const styles = require('./styles');

var uuid = require('react-native-uuid');

const controller = new Controller;

const dbTableName = Projects.TABLE_NAME

export class ProjectsScreen extends React.Component {
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
        notifier.scheduleAllNotifications()
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
                    save={() => { controller.saveExisting(this, dbTableName, theProject) }}

                    selectedItem={theProject}

                    delete={() => { controller.delete(this, dbTableName, theProject) }}

                    closeModal={() => { controller.setViewModalVisible(this, false) }}>
                </ViewProject>
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
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <TouchableOpacity onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }} style={item.value.completed == 'true' ? styles.listItemContainerFinished : styles.listItemContainer}>
                                <View style={styles.checkboxAndNameContainer}>
                                    <CheckBox
                                        center
                                        checkedIcon={colorsProvider.checkboxIcon}
                                        uncheckedIcon={colorsProvider.checkboxIcon}
                                        checkedColor={colorsProvider.finishedBackgroundColor}
                                        uncheckedColor={colorsProvider.projectsComplimentaryColor}
                                        size={colorsProvider.checkboxIconSize}
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
                                    {/* <TouchableOpacity
                                        style={styles.listItemActionButton}
                                    onPress={() => { controller.delete(this, dbTableName, item.value); notifier.scheduleAllNotifications() }}>
                                        <SIcon style={styles.listItemActionButton} name="trash" size={30} color={colorsProvider.redColor} />
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
                                        <SIcon style={styles.listItemActionButton} name="arrow-right" size={30} color={colorsProvider.shadowColor} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity></TouchableWithoutFeedback>} />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}