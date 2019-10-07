import React from 'react';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { Database, Habits } from '../../db'
import { CreateHabit, ViewHabit } from '../../modals'

var uuid = require('react-native-uuid');

const uuidv4 = require('uuid/v4');

export class HabitsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addModalVisible: false,
            viewHabitVisible: false,
            numberOfHabits: 0,

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
                    numberOfCompletedHabits: finishedHabArr.length
                })
            })
    }

    setAddModalVisible(visible) {
        this.setState({ addModalVisible: visible });
    }

    save(name, dueTime, importance, timeToSpend, notificationTime, daysToDo) {
        let newHabit = {}
        newHabit.id = uuid.v4();
        newHabit.name = name;
        newHabit.created_date = new Date().getDate().toString();
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
        this.setViewHabitVisible(true);
        global.selectedHabit = habitToGoTo;
    }

    showViewHabit() {
        if (this.state.viewHabitVisible) {
            return <ViewHabit
                animationType="slide"
                transparent={false}
                selectedHabit={global.selectedHabit}
                deleteHabit={() => {this.deleteHabit(global.selectedHabit)}}
                closeModal={() => { this.setViewHabitVisible(false) }}>
            </ViewHabit>
        }
    }

    deleteHabit(id)
    {
        Database.deleteOne(Habits.TABLE_NAME, id)
        this.loadHabits()
        this.setViewHabitVisible(false);
    }

    setViewHabitVisible(visible) {
        this.setState({ viewHabitVisible: visible })
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
                        onPress={() => { this.goToHabit(item.key) }}>
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