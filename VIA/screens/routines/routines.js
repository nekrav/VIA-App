import React from 'react';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { Database, Routines, Habits } from '../../db'
import { CreateRoutine, ViewRoutine } from '../../modals'
import { Controller } from '../controller'

const styles = require('./styles');

var uuid = require('react-native-uuid');

const controller = new Controller;

const dbTableName = Routines.TABLE_NAME

export class RoutinesScreen extends React.Component {
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

    saveNew(routine) {
        let newRoutine = {}
        newRoutine.id = uuid.v4();
        newRoutine.name = routine.name;
        newRoutine.created_date = new Date().getDate();
        newRoutine.start_time = routine.start_time ? routine.start_time : "";
        newRoutine.end_time = routine.end_time ? routine.end_time : "";
       
        Database.save(dbTableName, newRoutine).then(() => {
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, dbTableName)
        })
    }

    showAddModal() {
        let newRoutine = {};
        if (this.state.addModalVisible) {
            return <CreateRoutine
                animationType="slide"
                transparent={false}
                name={(text) => { newRoutine.name = text }}
                start_time={(text) => { newRoutine.due_date = text }}
                end_time={(text) => { newRoutine.end_time = text }}
                notification_time={(text) => { newRoutine.notification_time = text }}
                closeModal={() => { controller.setAddModalVisible(this, false) }}
                save={() => { this.saveNew(newRoutine) }}
            ></CreateRoutine>
        }
    }

    showViewRoutine() {
        if (this.state.viewModalVisible) {
            if (this.state.selectedItem != {}) {
                theProject = this.state.selectedItem
                return <ViewRoutine
                    animationType="slide"
                    transparent={false}
                    editName={(text) => {
                        theRoutine.name = text;
                        this.setState({ selectedProject: theRoutine })
                    }}
                    editStartTime={(text) => {
                        theProject.due_date = text;
                        this.setState({ selectedProject: theRoutine })
                    }}
                    editEndTime={(text) => {
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

                    save={() => { controller.saveExisting(this, dbTableName, theProject) }}

                    selectedItem={theProject}

                    delete={() => { controller.delete(this, dbTableName, theProject) }}

                    closeModal={() => { controller.setViewModalVisible(this, false) }}>
                </ViewRoutine>
            }
        }
    }

    render() {
        return (
            <View style={styles.outerView}>
                {this.showAddModal()}
                {this.showViewRoutine()}
                <Text style={styles.title}>Routines</Text>
                <Text style={styles.numberOfItems}>{this.state.numberOfItems}</Text>
                <Button style={styles.addButton}
                    title="Add Routine"
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