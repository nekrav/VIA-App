import React from 'react';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { Database, Habits } from '../../db'
import { CreateHabit, ViewHabit } from '../../modals'
import { Controller } from '../controller'

const styles = require('./styles');

var uuid = require('react-native-uuid');

const habitsController = new Controller;

export class HabitsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            viewModalVisible: false,
            items: [],
            numberOfItems: 0,
            numberOfFinishedItems: 0,
            selectedHabit: {}
        };
    }

    componentDidMount() {
        habitsController.loadAll(this, Habits.TABLE_NAME)
    }

    saveNew(habit) {
        let newHabit = {}
        newHabit.id = uuid.v4();
        newHabit.name = habit.name;
        newHabit.created_date = new Date().getDate();
        newHabit.due_time = habit.due_time ? habit.due_time : ""
        newHabit.importance = habit.importance ? habit.importance : ""
        newHabit.percentage_done = 0
        newHabit.completed = "false"
        newHabit.time_to_spend = habit.time_to_spend ? habit.time_to_spend : ""
        newHabit.notification_time = habit.notification_time ? habit.notification_time : ""
        newHabit.days_to_do = habit.days_to_do ? habit.days_to_do : ""

        Database.save(Habits.TABLE_NAME, newHabit).then(() => {
            habitsController.setAddModalVisible(this, false)
            habitsController.loadAll(this, Habits.TABLE_NAME)
        })
    }

    showAddModal() {
        let newHabit = {};
        if (this.state.addModalVisible) {
            return <CreateHabit
                animationType="slide"
                transparent={false}
                name={(text) => { newHabit.name = text }}
                due_time={(text) => { newHabit.due_time = text }}
                importance={(text) => { newHabit.importance = text }}
                time_to_spend={(text) => { newHabit.time_to_spend = text }}
                notification_time={(text) => { newHabit.notification_time = text }}
                days_to_do={(text) => { newHabit.days_to_do = text }}
                closeModal={() => { habitsController.setAddModalVisible(this, false) }}
                save={() => { this.saveNew(newHabit) }}
            ></CreateHabit>
        }
    }

    showViewHabit() {
        if (this.state.viewModalVisible) {
            if (this.state.selectedHabit != {}) {
                theHabit = this.state.selectedHabit
                return <ViewHabit
                    animationType="slide"
                    transparent={false}
                    editName={(text) => {
                        theHabit.name = text;
                        this.setState({ selectedHabit: theHabit })
                    }}
                    editDueTime={(text) => {
                        theHabit.due_time = text;
                        this.setState({ selectedHabit: theHabit })
                    }}
                    editImportance={(text) => {
                        theHabit.importance = text;
                        this.setState({ selectedHabit: theHabit })
                    }}
                    editTimeToSpend={(text) => {
                        theHabit.time_to_spend = text;
                        this.setState({ selectedHabit: theHabit })
                    }}
                    editNotificationTime={(text) => {
                        theHabit.notification_time = text;
                        this.setState({ selectedHabit: theHabit })
                    }}
                    editDaysToDo={(text) => {
                        theHabit.days_to_do = text;
                        this.setState({ selectedHabit: theHabit })
                    }}

                    save={() => { habitsController.saveExisting(this, Habits.TABLE_NAME, theHabit) }}

                    selectedHabit={theHabit}

                    deleteHabit={() => { habitsController.delete(this, Habits.TABLE_NAME, theHabit) }}

                    closeModal={() => { habitsController.setViewModalVisible(this, false) }}>
                </ViewHabit>
            }
        }
    }

    render() {
        return (
            <View style={styles.outerView}>
                {this.showAddModal()}
                {this.showViewHabit()}
                <Text style={styles.title}>Home!</Text>
                <Text style={styles.numberOfItems}>{this.state.numberOfItems}</Text>
                <Button style={styles.addButton}
                    title="Add Habit"
                    onPress={() => {
                        habitsController.setAddModalVisible(this, true);
                    }} />
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => <TouchableOpacity
                    style={styles.itemButton}
                        onPress={() => { habitsController.goToItem(this, Habits.TABLE_NAME, item.value.id) }}>
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