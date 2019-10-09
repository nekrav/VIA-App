import React from 'react';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { Database, Habits } from '../../db'
import { CreateHabit, ViewHabit } from '../../modals'
import { Controller } from '../controller'

var uuid = require('react-native-uuid');

const controller = new Controller;

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
        controller.loadAll(this, Habits.TABLE_NAME)
    }

    saveNew(habit) {
        let newHabit = {}
        console.warn(habit)
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
            controller.setAddModalVisible(this, false)
            controller.loadAll(this, Habits.TABLE_NAME)
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
                closeModal={() => { controller.setAddModalVisible(this, false) }}
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

                    save={() => { controller.saveExisting(this, Habits.TABLE_NAME, theHabit) }}

                    selectedHabit={theHabit}

                    deleteHabit={() => { controller.delete(this, Habits.TABLE_NAME, theHabit) }}

                    closeModal={() => { controller.setViewModalVisible(this, false) }}>
                </ViewHabit>
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {this.showAddModal()}
                {this.showViewHabit()}
                <Text>Home!</Text>
                <Text>{this.state.numberOfItems}</Text>
                <Button
                    title="Add Habit"
                    onPress={() => {
                        controller.setAddModalVisible(this, true);
                    }} />
                <FlatList
                    data={this.state.items}
                    renderItem={({ item }) => <TouchableOpacity
                        onPress={() => { controller.goToItem(this, Habits.TABLE_NAME, item.value.id) }}>
                        <View>
                            <CheckBox
                                center
                                title='Click Here'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checked}
                            />
                            <Text>{item.value.name}</Text>
                        </View>
                    </TouchableOpacity>}/>
            </View>
        );
    }
}