import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput } from 'react-native'; // Version can be specified in package.json
import { Database, Habits } from '../../db'

export class ViewHabit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedHabit: global.selectedHabit,
            addModalVisible: false,
            numberOfHabits: 0,
        };
    }

    componentDidMount() {
        this.loadHabit(global.selectedHabit);
    }

    loadHabit(id) {
        let selectedHabit = {};
        Database.getOne(Habits.TABLE_NAME, id).then((res) => {
            selectedHabit = res.rows.item(0)
            this.setState({ selectedHabit: selectedHabit })
        })
    }
    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={this.props.transparent}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}>
                <View style={{ marginTop: 22, alignItems: "center" }}>
                    <Text>Add Habit</Text>
                </View>
                <View>
                    <Text>Name</Text>
                    <TextInput
                    value={this.state.selectedHabit.name}
                        onChangeText={this.props.name}>
                    </TextInput>
                </View>
                <View>
                    <Text>Due Time</Text>
                    <TextInput
                        onChangeText={this.props.due_time}>
                    </TextInput>
                </View>
                <View>
                    <Text>Importance</Text>
                    <TextInput
                        onChangeText={this.props.importance}>
                    </TextInput>
                </View>
                <View>
                    <Text>Time to Spend</Text>
                    <TextInput
                        onChangeText={this.props.time_to_spend}>
                    </TextInput>
                </View>
                <View>
                    <Text>Notification Time</Text>
                    <TextInput
                        onChangeText={this.props.notification_time}>
                    </TextInput>
                </View>
                <View>
                    <Text>Days to do</Text>
                    <TextInput
                        onChangeText={this.props.days_to_do}>
                    </TextInput>
                </View>
                <View>
                    <TouchableOpacity onPress={this.props.closeModal}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.save}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}