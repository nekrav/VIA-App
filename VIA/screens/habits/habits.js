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

    save(name, dueTime, importance, timeToSpend, notificationTime, daysToDo) {
        let newHabit = {}
        newHabit.id = uuid.v4();
        newHabit.name = name;
        newHabit.created_date = new Date().getDate();
        newHabit.due_time = dueTime
        newHabit.importance = importance
        newHabit.percentage_done = 0
        newHabit.completed = "false"
        newHabit.time_to_spend = timeToSpend
        newHabit.notification_time = notificationTime
        newHabit.days_to_do = daysToDo

        Database.save(Habits.TABLE_NAME, newHabit)
    }

    saveExisting(habit) {
        Database.update(Habits.TABLE_NAME, habit).then(() => {
            controller.setViewModalVisible(this, false)
            controller.loadAll(this, Habits.TABLE_NAME);
        })
    }

    delete(habit) {
        Database.deleteOne(Habits.TABLE_NAME, habit.id).then(() => {
            controller.setViewModalVisible(this, false)
            controller.loadAll(this, Habits.TABLE_NAME);
        })
    }


    showAddModal() {
        let newHabit = {};
        if (this.state.addModalVisible) {
            return <CreateHabit
                animationType="slide"
                transparent={false}
                name={newName => this.setState({ newName })}
                due_time={newDueTime => this.setState({ newDueTime })}
                importance={newImportance => this.setState({ newImportance })} completed={newCompleted => this.setState({ newCompleted })}
                time_to_spend={newTimeToSpend => this.setState({ newTimeToSpend })}
                notification_time={newNotificationTime => this.setState({ newNotificationTime })}
                days_to_do={newDaysToDo => this.setState({ newDaysToDo })}

                closeModal={() => { controller.setAddModalVisible(this, false) }}
                save={() => {
                    this.save(
                        this.state.newName,
                        this.state.newDueTime ? this.state.newDueTime : '',
                        this.state.newImportance ? this.state.newImportance : '',
                        this.state.newTimeToSpend ? this.state.newTimeToSpend : '',
                        this.state.newNotificationTime ? this.state.newNotificationTime : '',
                        this.state.newDaysToDo ? this.state.newDaysToDo : '',
                    );

                    controller.setAddModalVisible(this, false); controller.loadAll(this, Habits.TABLE_NAME);
                }}
            ></CreateHabit>
        }
    }

    // goToHabit(habitToGoTo) {
    //     Database.getOne(Habits.TABLE_NAME, habitToGoTo).then((res) => {
    //         selectedHabit = res.rows.item(0)
    //         this.setState({ selectedHabit: selectedHabit })
    //     })
    //     controller.setViewModalVisible(this, true);
    // }

    showViewHabit() {
        if (this.state.viewModalVisible) {
            if (this.state.selectedHabit != {}) {
                theHabit = this.state.selectedHabit
                return <ViewHabit
                    animationType="slide"
                    transparent={false}
                    editName={
                        (text) => {
                            theHabit.name = text;
                            this.setState({selectedHabit: theHabit})
                        }
                    }
                    editDueTime={
                        (text) => {
                            theHabit.due_time = text;
                            this.setState({selectedHabit: theHabit})
                        }
                    }
                    editImportance={
                        (text) => {
                            theHabit.importance = text;
                            this.setState({selectedHabit: theHabit})
                        }
                    }
                    editTimeToSpend={
                        (text) => {
                            theHabit.time_to_spend = text;
                            this.setState({selectedHabit: theHabit})
                        }
                    }
                    editNotificationTime={
                        (text) => {
                            theHabit.notification_time = text;
                            this.setState({selectedHabit: theHabit})
                        }
                    }
                    editDaysToDo={
                        (text) => {
                            theHabit.days_to_do = text;
                            this.setState({selectedHabit: theHabit})
                        }
                    }

                    save={() => {this.saveExisting(theHabit)}}
                    selectedHabit={theHabit}
                    deleteHabit={() => { this.delete(theHabit) }}
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
                        // onPress={() => { this.goToHabit(item.value.id) }}>
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
                    </TouchableOpacity>}
                />
            </View>
        );
    }
}