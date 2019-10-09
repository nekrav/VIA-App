import React from 'react';
import { CheckBox } from 'react-native-elements'
import { Text, View, Button, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Database, Habits } from '../../db'
import { CreateHabit, ViewHabit } from '../../modals'

var uuid = require('react-native-uuid');

export class HabitView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canEdit: false,
            selectedHabit: {}
        };
    }

    componentDidMount() {
        this.loadHabit();
    }

    loadHabit() {
        let selectedHabit = {}
        Database.getOne(Habits.TABLE_NAME, global.selectedHabit).then((res) => {
            selectedHabit = res.rows.item(0)
            this.setState({ selectedHabit: selectedHabit })
        })
    }

    canEdit() {
        this.setState({ canEdit: true })
    }

    // save(name, dueTime, importance, timeToSpend, notificationTime, daysToDo) {
    //     let newHabit = {}
    //     newHabit.id = uuid.v4();
    //     newHabit.name = name;
    //     newHabit.created_date = new Date().getDate();
    //     newHabit.due_time = dueTime
    //     newHabit.importance = importance
    //     newHabit.percentage_done = 0
    //     newHabit.completed = "false"
    //     newHabit.time_to_spend = timeToSpend
    //     newHabit.notification_time = notificationTime
    //     newHabit.days_to_do = daysToDo

    //     Database.save(Habits.TABLE_NAME, newHabit)
    // }

    // save(habit) {
    //     Database.update(Habits.TABLE_NAME, habit).then(() => {
    //         this.setViewModalVisible(false)
    //         this.loadHabits();
    //     })
    // }

    delete(habit) {
        Database.deleteOne(Habits.TABLE_NAME, habit.id).then(() => {
            this.setViewModalVisible(false)
            this.loadHabits();
        })
    }

    goBack()
    {
        // global.selectedHabit = ""
        // this.props.navigation.reset();
        this.props.navigation.navigate('AllHabits');
        // this.props.navigation.replace('AllHabits')
    }

    

    render() {
        // let hab = this.state.selectedHabit
        return (
            <View>
                <View style={{ marginTop: 22, alignItems: "center" }}>
                    <Text>View Habit</Text>
                </View>
                <View>
                    <Text>Name</Text>
                    {/* <TextInput
                        editable={this.state.canEdit}
                        value={hab.name}
                        onChangeText={this.props.editName}>
                    </TextInput> */}
                </View>
                {/* <View>
                    <Text>Due Time</Text>
                    <TextInput
                        editable={this.state.canEdit}
                        value={this.props.selectedHabit.due_time}
                        onChangeText={this.props.editDueTime}>
                    </TextInput>
                </View>
                <View>
                    <Text>Importance</Text>
                    <TextInput
                        editable={this.state.canEdit}
                        value={this.props.selectedHabit.importance}
                        onChangeText={this.props.editImportance}>
                    </TextInput>
                </View>
                <View>
                    <Text>Time to Spend</Text>
                    <TextInput
                        editable={this.state.canEdit}
                        value={this.props.selectedHabit.time_to_spend}
                        onChangeText={this.props.editTimeToSpend}>
                    </TextInput>
                </View>
                <View>
                    <Text>Notification Time</Text>
                    <TextInput
                        editable={this.state.canEdit}
                        value={this.props.selectedHabit.notification_time}
                        onChangeText={this.props.editNotificationTime}>
                    </TextInput>
                </View>
                <View>
                    <Text>Days to do</Text>
                    <TextInput
                        editable={this.state.canEdit}
                        value={this.props.selectedHabit.days_to_do}
                        onChangeText={this.props.editDaysToDo}>
                    </TextInput>
                </View> */}
                <View>
                    <TouchableOpacity onPress={() => this.goBack()}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={this.props.save}>
                        <Text>Save</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity onPress={this.props.deleteHabit}>
                        <Text>Delete</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => this.canEdit()}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}