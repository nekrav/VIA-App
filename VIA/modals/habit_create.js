import React from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput } from 'react-native'; // Version can be specified in package.json

export class CreateHabit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newHabit: this.props.newHabit,
            addModalVisible: false,
            numberOfHabits: 0,
        };
    }
    render() {
        let habit = this.state.newHabit;

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
                        onChangeText={this.props.name}>
                    </TextInput>
                </View>
                <View>
                    <Text>Create Date</Text>
                    <TextInput
                        onChangeText={this.props.created_date}>
                    </TextInput>
                </View>
                <View>
                    <Text>Due Time</Text>
                    <TextInput
                        onChangeText={this.props.due_time}>
                    </TextInput>
                </View>
                <View>
                    <Text>Imporance</Text>
                    <TextInput
                        onChangeText={this.props.importance}>
                    </TextInput>
                </View>
                <View>
                    <Text>Percentage Done</Text>
                    <TextInput
                        onChangeText={this.props.percentage_done}>
                    </TextInput>
                </View>
                <View>
                    <Text>Completed</Text>
                    <TextInput
                        onChangeText={this.props.completed}>
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