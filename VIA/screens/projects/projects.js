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
        controller.loadAll(this, dbTableName)
    }

    saveNew(project) {
        let newProject = {}
        newProject.id = uuid.v4();
        newProject.name = project.name;
        newProject.created_date = new Date().getDate();
        newProject.due_date = project.due_date ? project.due_date : "";
        newProject.importance = project.importance ? project.importance : "";
        newProject.percentage_done = 0;
        newProject.completed = "false";
        newProject.time_spent = 0;
        newProject.notes = 0;

        Database.save(dbTableName, newProject).then(() => {
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, dbTableName)
        })
    }

    showAddModal() {
        let newProject = {};
        if (this.state.addModalVisible) {
            return <CreateProject
                animationType="slide"
                transparent={false}
                name={(text) => { newProject.name = text }}
                due_date={(text) => { newProject.due_date = text }}
                importance={(text) => { newProject.importance = text }}
                time_spent={(text) => { newProject.time_spent = text }}
                notes={(text) => { newProject.notes = text }}
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

                    save={() => { controller.saveExisting(this, dbTableName, theProject) }}

                    selectedItem={theProject}

                    delete={() => { controller.delete(this, dbTableName, theProject) }}

                    closeModal={() => { controller.setViewModalVisible(this, false) }}>
                </ViewProject>
            }
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.outerView}>
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




                    <View style={styles.topNav}>
                        <Text style={styles.title}>Projects</Text>
                        <Text style={styles.numberOfItems}>{this.state.numberOfItems}</Text>
                        <Button style={styles.addButton}
                            title="Add Project"
                            onPress={() => {
                                controller.setAddModalVisible(this, true);
                            }} />
                        <FlatList
                            data={this.state.items}
                            renderItem={({ item }) => <TouchableOpacity
                                style={styles.itemButton}
                                onPress={() => { controller.goToItem(this, dbTableName, item.value.id) }}>
                                <View style={styles.listItem}>
                                    <CheckBox
                                        style={styles.checkBox}
                                        center
                                        title='Click Here'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.checked}
                                    />
                                    <Text style={styles.itemName}>{item.value.name}</Text>
                                </View>
                            </TouchableOpacity>} />
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}