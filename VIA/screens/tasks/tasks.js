import React from 'react';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { Database, Projects, Tasks} from '../../db'
import { CreateTask, ViewTask } from '../../modals'
import { Controller } from '../controller'

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
        newTask.notification_time = task.notification_time ? task.notification_time : "";
       
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
                due_date={(text) => { newTask.due_date = text }}
                importance={(text) => { newTask.importance = text }}
                project={(text) => { newTask.project = text }}
                time_spent={(text) => { newTask.time_spent = text }}
                notes={(text) => { newTask.notes = text }}
                notification_time={(text) => { newTask.notification_time = text }}
                closeModal={() => { controller.setAddModalVisible(this, false) }}
                save={() => { this.saveNew(newTask) }}
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
                        theTask.notification_time = text;
                        this.setState({ selectedTask: theTask })
                    }}
                  

                    save={() => { controller.saveExisting(this, dbTableName, theTask) }}

                    selectedItem={theTask}

                    delete={() => { controller.delete(this, dbTableName, theTask) }}

                    closeModal={() => { controller.setViewModalVisible(this, false) }}>
                </ViewTask>
            }
        }
    }

    render() {
        return (
            
            <View style={styles.outerView}>
            
                {this.showAddModal()}
                {this.showViewTask()}
                <Text style={styles.title}>Tasks</Text>
                <Text style={styles.numberOfItems}>{this.state.numberOfItems}</Text>
                <Button style={styles.addButton}
                    title="Add Task"
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
        );
    }
}