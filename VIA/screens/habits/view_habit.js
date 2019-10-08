import React from 'react';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { Database, Habits } from '../../db'
import { CreateHabit, ViewHabit } from '../../modals'

var uuid = require('react-native-uuid');

export class HabitView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            viewModalVisible: false,
            numberOfHabits: 0,
            numberOfFinishedHabits: 0,
            selectedHabit: {}
        };
    }

    componentDidMount() {
        this.loadHabits();
    }

    loadHabits() {
        const habArr = []
        const finishedHabArr = []
        Database.getAll(Habits.TABLE_NAME)
            .then((res) => {
                const len = res.rows.length;
                let h = {}
                for (let i = 0; i < len; i++) {
                    h = res.rows.item(i)
                    habArr.push({ key: JSON.stringify(h.id), name: h.name, value: h })
                    if (h.completed === 'true') {
                        finishedHabArr.push({ key: JSON.stringify(h.id), name: h.name, value: h })
                    }
                }
                this.setState({
                    habits: habArr,
                    numberOfHabits: len,
                    numberOfFinishedHabits: finishedHabArr.length
                })
            })
    }

    setAddModalVisible(visible) {
        this.setState({ addModalVisible: visible });
    }

    setViewModalVisible(visible) {
        this.setState({ viewModalVisible: visible })
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

    showAddModal() {
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

                closeModal={() => { this.setAddModalVisible(false) }}
                save={() => {
                    this.save(
                        this.state.newName,
                        this.state.newDueTime ? this.state.newDueTime : '',
                        this.state.newImportance ? this.state.newImportance : '',
                        this.state.newTimeToSpend ? this.state.newTimeToSpend : '',
                        this.state.newNotificationTime ? this.state.newNotificationTime : '',
                        this.state.newDaysToDo ? this.state.newDaysToDo : '',
                    );

                    this.setAddModalVisible(false); this.loadHabits();
                }}
            ></CreateHabit>
        }
    }

    goToHabit(habitToGoTo) {
        this.setViewModalVisible(true);
        Database.getOne(Habits.TABLE_NAME, habitToGoTo).then((res) => {
            selectedHabit = res.rows.item(0)
            this.setState({ selectedHabit: selectedHabit })
        })
    }

    save(habit) {
        Database.update(Habits.TABLE_NAME, habit).then(() => {
            this.setViewModalVisible(false)
            this.loadHabits();
        })
    }

    delete(habit) {
        Database.deleteOne(Habits.TABLE_NAME, habit.id).then(() => {
            this.setViewModalVisible(false)
            this.loadHabits();
        })
    }

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

                    save={() => {this.save(theHabit)}}
                    selectedHabit={theHabit}
                    deleteHabit={() => { this.delete(theHabit) }}
                    closeModal={() => { this.setViewModalVisible(false) }}>
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
                <Text>{this.state.numberOfHabits}</Text>
                <Button
                    title="Add Habit"
                    onPress={() => {
                        this.setAddModalVisible(true);
                    }} />
                <FlatList
                    data={this.state.habits}
                    renderItem={({ item }) => <TouchableOpacity
                        onPress={() => { this.goToHabit(item.value.id) }}>
                        <View>
                            <CheckBox
                                center
                                title='Click Here'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checked}
                            />
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>}
                />
            </View>
        );
    }
}